import { FormValuesMap, IFormField, Slug } from "@/types/form";

const FORM_FIELD_CONFIGS: { [K in Slug]: IFormField<FormValuesMap[K]>[] } = {
  profile: [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Username...",
      autoComplete: "username",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "email address...",
      autoComplete: "email",
    },
    {
      name: "headline",
      label: "Headline",
      type: "text",
      placeholder: "Headline...",
      autoComplete: "headline",
    },
    {
      name: "biography",
      label: "Biography",
      type: "textarea",
      placeholder: "Biography...",
      autoComplete: "biography",
    },
  ],
  social: [
    {
      name: "github",
      label: "Github",
      type: "text",
      placeholder: "Username",
      autoComplete: "github",
    },
    {
      name: "linkedin",
      label: "Linkedin",
      type: "text",
      placeholder: "Username",
      autoComplete: "linkedin",
    },
    {
      name: "facebook",
      label: "Facebook",
      type: "text",
      placeholder: "Username",
      autoComplete: "facebook",
    },
    {
      name: "instagram",
      label: "Instagram",
      type: "text",
      placeholder: "Username",
      autoComplete: "instagram",
    },
  ],
  password: [
    {
      name: "currentPassword",
      label: "Current Password",
      type: "password",
      placeholder: "Password...",
      autoComplete: "current-password",
    },
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      placeholder: "New Password...",
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password...",
      autoComplete: "new-password",
    },
  ],
  loginPage: [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "email address...",
      autoComplete: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      autoComplete: "password",
    },
  ],
  signupPage: [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Username..",
      autoComplete: "username",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "email address...",
      autoComplete: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      autoComplete: "current-password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      autoComplete: "new-password",
    },
  ],
  resetPassword: [
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      autoComplete: "new-password",
    },
  ],
};

const useFormFields = <S extends Slug>({ slug }: { slug: S }) => {
  const getFormFields = (): IFormField<FormValuesMap[S]>[] => {
    return FORM_FIELD_CONFIGS[slug] || [];
  };

  return { getFormFields };
};

export default useFormFields;
