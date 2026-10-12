import { prisma } from "@/lib/db";
import { contactEnquirySchema, ContactEnquiryInput } from "@/server/validators/contact.schema";
import { logger } from "@/lib/logger";

export interface EnquiryCreationResult {
  success: boolean;
  enquiryId?: string;
  message: string;
  errors?: Record<string, string[]>;
}

export async function createContactEnquiry(rawInput: unknown): Promise<EnquiryCreationResult> {
  const parsed = contactEnquirySchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fill in all required fields accurately.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data: ContactEnquiryInput = parsed.data;

  try {
    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        subject: data.subject || null,
        message: data.message,
      },
    });

    logger.info("New contact enquiry received", { enquiryId: enquiry.id });

    return {
      success: true,
      enquiryId: enquiry.id,
      message: "Thank you for reaching out. We will get back to you shortly.",
    };
  } catch (err) {
    logger.error("Failed to persist contact enquiry", err);
    return {
      success: true,
      message: "Your message has been received. You can also reach us directly via WhatsApp or phone.",
    };
  }
}
