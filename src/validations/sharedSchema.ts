import { z } from "zod";

export const paginationSchema = z.object({
  page: z
    .string()
    .trim()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((val) => val > 0, {
      message: "The page must be a positive number.",
    })
    .optional(),
  limit: z
    .string()
    .trim()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((val) => val > 0, {
      message: "The limit must be a positive number.",
    })
    .optional(),
});

export const idSchema = z.object({
  id: z.string().uuid(),
});

export const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(6, "The email must be at least 6 characters long.")
      .max(255, "The email can be a maximum of 255 characters long.")
      .email({ message: "Invalid email format." }),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters long.")
      .max(128, "The password can be a maximum of 30 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."
      ),
  })
  .strict();
