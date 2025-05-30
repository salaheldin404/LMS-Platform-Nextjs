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
import { signupSchema } from "@/lib/validation/auth";
import { Button } from "@/components/ui/button";

import { useSignupMutation } from "@/lib/store/features/authApiSlice";
import { useRouter } from "next/navigation";
import useFormFields from "@/hooks/useFormFields";

import type { TApiError } from "@/types/apiError";
import { IFormField } from "@/types";

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [signup, { isLoading, error }] = useSignupMutation();
  const router = useRouter();

  const { getFormFields } = useFormFields({ slug: "signupPage" });
  const formFields = getFormFields();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await signup(data).unwrap();
      router.push("/dashboard");
      console.log(response, "signup response");
    } catch (error) {
      console.log(error, "erorr from signup");
    }
  };

  const renderFormField = (field: IFormField) => (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name as keyof SignupFormValues}
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
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        {formFields.map(renderFormField)}
        {error && (
          <p className="text-red-700">{(error as TApiError).message}</p>
        )}
        <Button
          disabled={isLoading}
          className="bg-primary w-full"
          type="submit"
        >
          Create Account
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
