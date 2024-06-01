import { z } from "zod";

import { loginValidationSchema } from "@/types";

export type FormValues = z.infer<typeof loginValidationSchema>;

export const defaultValues: FormValues = {
  code: "",
  email: "",
  password: "",
};

export { loginValidationSchema };
