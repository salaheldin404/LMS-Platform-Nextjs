"use client";
import Image from "next/image";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { forgetPasswordSchema } from "@/lib/validation/auth";
import Link from "next/link";

import { forgotPassword } from "@/server/actions/auth";
import type { ActionState } from "@/types/authType";
import SubmitButton from "../_components/SubmitButton";

type ForgetPasswordValues = z.infer<typeof forgetPasswordSchema>;

const initial: ActionState = {
  error: null,
  status: "",
  message: "",
};

const ForgetPasswordPage = () => {
  const [state, action] = useActionState(forgotPassword, initial);
  const [isPending, startTransition] = useTransition();
  const form = useForm<ForgetPasswordValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPasswordValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    startTransition(() => {
      action(formData);
    });
  };

  console.log(state, "from forget password page");
  return (
    <div className="relative bg-background">
      <div className="container px-4 mx-auto h-[calc(100vh-70px)]  justify-center pt-5 gap-6  md:flex  md:items-center md:justify-end ">
        <div className="overflow-hidden bg-muted dark:bg-card h-[calc(100vh-70px)] hidden md:block relative md:absolute top-0 left-0  md:w-[40%] lg:w-1/2 ">
          <Image
            src="/img-3.png"
            alt="hero"
            className="object-contain absolute lg:!top-auto lg:!h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
            fill
            priority
          />
        </div>
        <div className=" md:w-1/2 lg:w-[calc(50%-200px)]">
          <h1 className="text-center mb-6 font-semibold text-2xl md:text-3xl">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {state.error && <div className="text-red-500">{state.error}</div>}
              {state.message && (
                <div className="text-green-500">{state.message}</div>
              )}
              <SubmitButton
                pendingText="Sending..."
                defaultText="Send Reset Link"
                isPending={isPending}
              />
              <Link
                href="/auth/login"
                className="text-muted-foreground block w-fit"
              >
                Back to Login
              </Link>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
