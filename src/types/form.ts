import * as z from "zod";
import {
  loginSchema,
  signupSchema,
  resetPasswordSchema,
} from "@/lib/validation/auth";
import {
  changePasswordSchema,
  socialMediaSchema,
  basicInformationSchema,
} from "@/lib/validation/userValidation";

export type Slug =
  | "profile"
  | "social"
  | "password"
  | "loginPage"
  | "signupPage"
  | "resetPassword";

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type SocialFormValues = z.infer<typeof socialMediaSchema>;
export type BasicInformationFormValues = z.infer<typeof basicInformationSchema>;

export type FormValuesMap = {
  profile: BasicInformationFormValues;
  social: SocialFormValues;
  password: ChangePasswordFormValues;
  loginPage: LoginFormValues;
  signupPage: SignupFormValues;
  resetPassword: ResetPasswordFormValues;
};

import { Path, FieldValues } from "react-hook-form";
export interface IOption {
  label: string;
  value: string;
}

export type IFormField<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "checkbox"
    | "radio"
    | "select"
    | "hidden"
    | "textarea";
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  options?: IOption;
  id?: string;
  defaultValue?: string;
  readOnly?: boolean;
  autoComplete?: string;
};
