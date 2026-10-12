import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url().default("postgresql://postgres:postgres@localhost:5432/chhind_dham_travels?schema=public"),
  AUTH_SECRET: z.string().min(16).default("dev-insecure-secret-key-at-least-32-chars-long-local"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z.string().default("छिंद धाम TOUR TRAVELS"),
  CONTACT_PHONE_1: z.string().default("9691345722"),
  CONTACT_NAME_1: z.string().default("Karan Kushwaha"),
  CONTACT_PHONE_2: z.string().default("7400950207"),
  CONTACT_NAME_2: z.string().default("Akash Ahirwar"),
  CONTACT_LOCATION: z.string().default("Bhanpur, Bhopal, Madhya Pradesh, India"),
});

export type Env = z.infer<typeof envSchema>;

let parsedEnv: Env;

try {
  parsedEnv = envSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    CONTACT_PHONE_1: process.env.CONTACT_PHONE_1,
    CONTACT_NAME_1: process.env.CONTACT_NAME_1,
    CONTACT_PHONE_2: process.env.CONTACT_PHONE_2,
    CONTACT_NAME_2: process.env.CONTACT_NAME_2,
    CONTACT_LOCATION: process.env.CONTACT_LOCATION,
  });
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("❌ Invalid environment variables:", JSON.stringify(error.format(), null, 2));
  }
  // Fall back to defaults in non-production environments to avoid hard crash
  parsedEnv = envSchema.parse({});
}

export const env = parsedEnv;
