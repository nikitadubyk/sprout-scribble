"use client";

import { Path, FieldValues, UseFormReturn } from "react-hook-form";

import { Input, InputProps } from "../ui/input";
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

interface InputFieldProps<T extends FieldValues>
  extends Omit<InputProps, "name" | "form"> {
  name: Path<T>;
  label?: string;
  form: UseFormReturn<T, any, undefined>;
}

export const InputField = <T extends FieldValues>({
  form,
  name,
  label,
  ...props
}: InputFieldProps<T>) => (
  <FormField
    name={name}
    control={form.control}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input {...props} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
