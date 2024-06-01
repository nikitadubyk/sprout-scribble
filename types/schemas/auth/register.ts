import { z } from "zod";

export const registerValidationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, { message: "Name is required field" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Must be 6 or more characters long" }),
});
