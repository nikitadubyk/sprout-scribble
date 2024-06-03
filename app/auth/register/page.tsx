"use client";

import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import { Routes } from "@/config";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { emailRegister } from "@/server/actions/auth";
import { InputField } from "@/components/fields/input";
import { AuthCard } from "@/components/auth/auth-card";

import { FormValues, defaultValues, registerValidationSchema } from "./config";

const { Login } = Routes.Auth;

/**
 * Register page with form.
 */
export default function Register() {
  const { toast } = useToast();

  const { status, execute } = useAction(emailRegister, {
    onSuccess: (data) => {
      toast(
        data?.error
          ? {
              variant: "destructive",
              description: data.error,
              title: "Uh oh! Something went wrong.",
            }
          : {
              title: "Account successfully created!",
              description: " Mail confirmation letter has been sent",
            }
      );
    },
  });

  const form = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(registerValidationSchema),
  });

  const { isDirty, isSubmitting } = form.formState;

  const onSubmit = (values: FormValues) => {
    execute(values);
    form.reset();
  };

  return (
    <AuthCard
      showSocials
      backPath={Login}
      title="Create an account!"
      backButtonLabel="Go back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <InputField
              form={form}
              name="email"
              label="Email"
              placeholder="Email"
            />
            <InputField
              form={form}
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
            />
            <InputField
              form={form}
              name="name"
              label="Name"
              placeholder="Name"
            />
          </div>

          <Button
            type="submit"
            className="my-2 w-full"
            disabled={!isDirty || isSubmitting || status === "executing"}
          >
            Create account
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
