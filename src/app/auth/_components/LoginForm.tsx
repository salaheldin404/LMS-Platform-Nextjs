"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validation/auth";
import { Button } from "@/components/ui/button";

import useFormFields from "@/hooks/useFormFields";

import { login as loginAction } from "@/server/actions/auth";

import { useActionState, useCallback } from "react";
import { useFormStatus } from "react-dom";

import { IFormField } from "@/types";

type LoginFormValues = z.infer<typeof loginSchema>;

const initial = {
  error: null,
  status: "",
};

const LoginForm = () => {
  const [state, action] = useActionState(loginAction, initial);
  const { getFormFields } = useFormFields({
    slug: "loginPage",
  });
  const formFields = getFormFields();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Create a separate submit button component
  const SubmitButton = () => {
    const { pending } = useFormStatus(); // Now this is inside the form

    return (
      <Button disabled={pending} className="bg-primary w-full" type="submit">
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    );
  };

  // Render form field
  const renderFormField = useCallback(
    (field: IFormField) => (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name as keyof LoginFormValues}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
            <FormControl>
              <Input
                {...formField}
                id={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                aria-label={field.name}
                placeholder={field.placeholder}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    [form.control]
  );

  return (
    <Form {...form}>
      <form className="space-y-5" action={action}>
        {formFields.map(renderFormField)}
        {state.error && <div className="text-red-500">{state.error}</div>}
        <SubmitButton />
        {/* <Button disabled={pending} className="bg-primary w-full" type="submit">
          {pending ? "Signing in..." : "Sign in"}
        </Button> */}
      </form>
    </Form>
  );
};

export default LoginForm;
