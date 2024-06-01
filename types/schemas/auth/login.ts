import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email(),
  code: z.optional(z.string()),
  password: z
    .string()
    .trim()
    .min(6, { message: "Must be 5 or more characters long" }),
});
