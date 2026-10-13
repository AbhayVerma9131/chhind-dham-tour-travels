import { prisma } from "@/lib/db";
import { CreateBookingInput, createBookingSchema } from "@/server/validators/booking.schema";
import { generateBookingReference, isValidStatusTransition } from "./booking-lifecycle";
import { BookingStatus } from "@prisma/client";
import { logger } from "@/lib/logger";
import { getNotificationAdapter } from "@/server/notifications/adapter";

export interface BookingCreationResult {
  success: boolean;
  referenceNumber?: string;
  bookingId?: string;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Creates a customer booking enquiry.
 * Initial status is strictly PENDING until approved by admin.
 */
export async function createBookingEnquiry(rawInput: unknown): Promise<BookingCreationResult> {
  const parsed = createBookingSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the errors in the booking form.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data: CreateBookingInput = parsed.data;
  const referenceNumber = generateBookingReference();

  let verifiedVehicleId: string | null = null;
  if (data.vehicleId && !data.vehicleId.startsWith("seed-")) {
    try {
      const v = await prisma.vehicle.findUnique({ where: { id: data.vehicleId } });
      if (v) verifiedVehicleId = v.id;
    } catch {
      // Ignore if vehicle lookup fails
    }
  }

  let verifiedPackageId: string | null = null;
  if (data.tourPackageId && !data.tourPackageId.startsWith("seed-")) {
    try {
      const p = await prisma.tourPackage.findUnique({ where: { id: data.tourPackageId } });
      if (p) verifiedPackageId = p.id;
    } catch {
      // Ignore if package lookup fails
    }
  }

  try {
    const booking = await prisma.bookingRequest.create({
      data: {
        referenceNumber,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail || null,
        rentalType: data.rentalType,
        vehicleId: verifiedVehicleId,
        tourPackageId: verifiedPackageId,
        pickupDate: data.pickupDate,
        returnDate: data.returnDate || null,
        pickupLocation: data.pickupLocation,
        dropLocation: data.dropLocation || null,
        passengerCount: data.passengerCount || null,
        customerNotes: data.customerNotes || null,
        status: "PENDING",
        statusHistory: {
          create: {
            fromStatus: null,
            toStatus: "PENDING",
            notes: "Booking enquiry submitted by customer.",
            changedBy: "CUSTOMER",
          },
        },
      },
    });

    logger.info("New booking enquiry received", {
      referenceNumber,
      rentalType: data.rentalType,
    });

    // Dispatch background notifications via pluggable adapter
    try {
      const adapter = getNotificationAdapter();
      await Promise.all([
        adapter.sendCustomerAcknowledgement({
          referenceNumber,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          customerEmail: data.customerEmail,
          rentalType: data.rentalType,
          pickupDate: data.pickupDate.toISOString().slice(0, 10),
          pickupLocation: data.pickupLocation,
          status: "PENDING",
        }),
        adapter.sendAdminAlert({
          referenceNumber,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          rentalType: data.rentalType,
          pickupDate: data.pickupDate.toISOString().slice(0, 10),
          pickupLocation: data.pickupLocation,
          status: "PENDING",
        }),
      ]);
    } catch (notifErr) {
      logger.warn("Non-fatal error dispatching notifications", { err: String(notifErr) });
    }

    return {
      success: true,
      referenceNumber: booking.referenceNumber,
      bookingId: booking.id,
      message: "Your booking request has been submitted. Our team will verify availability and contact you shortly.",
    };
  } catch (err: any) {
    logger.error("Failed to save booking enquiry to database", err);
    console.error("CRITICAL: Failed to save booking to database:", err?.message || err);
    return {
      success: false,
      message: "Database connection error on server. Please ensure DATABASE_URL is set in Vercel settings.",
      errors: { database: [err?.message || "Database insert failed"] },
    };
  }
}

/**
 * Updates a booking's status following allowed state transitions
 */
export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus,
  adminNotes?: string,
  changedBy: string = "ADMIN"
) {
  const booking = await prisma.bookingRequest.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking request not found.");
  }

  if (!isValidStatusTransition(booking.status, newStatus)) {
    throw new Error(
      `Invalid status transition from ${booking.status} to ${newStatus}. Transition not permitted.`
    );
  }

  const updated = await prisma.$transaction([
    prisma.bookingRequest.update({
      where: { id: bookingId },
      data: {
        status: newStatus,
        adminNotes: adminNotes ?? booking.adminNotes,
      },
    }),
    prisma.bookingStatusHistory.create({
      data: {
        bookingRequestId: bookingId,
        fromStatus: booking.status,
        toStatus: newStatus,
        notes: adminNotes ?? null,
        changedBy,
      },
    }),
  ]);

  logger.info(`Booking status transitioned to ${newStatus}`, { bookingId });
  return updated[0];
}

/**
 * Finds a booking by its reference number
 */
export async function getBookingByReference(referenceNumber: string) {
  return prisma.bookingRequest.findUnique({
    where: { referenceNumber },
    include: {
      vehicle: true,
      tourPackage: true,
      statusHistory: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}
