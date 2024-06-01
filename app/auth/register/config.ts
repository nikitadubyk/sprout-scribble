import { z } from "zod";

import { registerValidationSchema } from "@/types";

export type FormValues = z.infer<typeof registerValidationSchema>;

export const defaultValues: FormValues = {
  name: "",
  email: "",
  password: "",
};

export { registerValidationSchema };
