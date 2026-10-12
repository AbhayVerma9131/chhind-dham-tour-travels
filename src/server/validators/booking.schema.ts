import { z } from "zod";

export const RentalTypeEnum = z.enum(["SELF_DRIVE", "CHAUFFEUR", "TOUR_PACKAGE"]);
export type RentalType = z.infer<typeof RentalTypeEnum>;

export const BookingStatusEnum = z.enum([
  "PENDING",
  "CONTACTED",
  "CONFIRMED",
  "REJECTED",
  "CANCELLED",
  "COMPLETED",
]);
export type BookingStatus = z.infer<typeof BookingStatusEnum>;

export const createBookingSchema = z
  .object({
    customerName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
    customerPhone: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
    customerEmail: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .optional()
      .or(z.literal("")),
    rentalType: RentalTypeEnum,
    vehicleId: z.string().uuid().optional().nullable(),
    tourPackageId: z.string().uuid().optional().nullable(),
    pickupDate: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
      message: "Valid pickup date is required",
    }),
    returnDate: z.coerce.date().optional().nullable(),
    pickupLocation: z.string().trim().min(3, "Pickup location must be at least 3 characters").max(200),
    dropLocation: z.string().trim().max(200).optional().nullable(),
    passengerCount: z.coerce.number().int().min(1).max(20).optional().nullable(),
    customerNotes: z.string().trim().max(1000).optional().nullable(),
  })
  .superRefine((data, ctx) => {
    // Pickup date should not be significantly in the past
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    if (data.pickupDate < oneDayAgo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pickupDate"],
        message: "Pickup date cannot be in the past",
      });
    }

    // Return date must be after pickup date if provided
    if (data.returnDate && data.returnDate < data.pickupDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["returnDate"],
        message: "Return date must be on or after pickup date",
      });
    }

    // If Tour Package, tourPackageId is expected
    if (data.rentalType === "TOUR_PACKAGE" && !data.tourPackageId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["tourPackageId"],
        message: "Please select a tour package",
      });
    }
  });

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export const updateBookingStatusSchema = z.object({
  status: BookingStatusEnum,
  notes: z.string().trim().max(500).optional(),
  adminNotes: z.string().trim().max(1000).optional(),
});

export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>;
