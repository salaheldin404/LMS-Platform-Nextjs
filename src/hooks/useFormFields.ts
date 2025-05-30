import { IFormField } from "@/types";

interface IProps {
  slug: string;
}

// const FORM_CONFIGS = {
//   profile: [
//     {
//       name: "username",
//       label: "Username",
//       type: "text",
//       placeholder: "Username...",
//       autoComplete: "username",
//     },
//     {
//       name: "email",
//       label: "Email",
//       type: "email",
//       placeholder: "Email address...",
//       autoComplete: "email",
//     },
//     {
//       name: "biography",
//       label: "Biography",
//       type: "textarea",
//       placeholder: "Biography...",
//       autoComplete: "biography",
//     },
//     {
//       name: "headline",
//       label: "Headline",
//       type: "text",
//       placeholder: "Headline...",
//       autoComplete: "headline",
//     },
//   ],
//   social: [
//     {
//       name: "github",
//       label: "Github",
//       type: "text",
//       placeholder: "Username",
//       autoComplete: "github",
//     },
//     {
//       name: "linkedin",
//       label: "Linkedin",
//       type: "text",
//       placeholder: "Username",
//       autoComplete: "linkedin",
//     },
//     {
//       name: "facebook",
//       label: "Facebook",
//       type: "text",
//       placeholder: "Username",
//       autoComplete: "facebook",
//     },
//     {
//       name: "instagram",
//       label: "Instagram",
//       type: "text",
//       placeholder: "Username",
//       autoComplete: "instagram",
//     },
//   ],
//   password: [
//     {
//       name: "currentPassword",
//       label: "Current Password",
//       type: "password",
//       placeholder: "Password...",
//       autoComplete: "current-password",
//     },
//     {
//       name: "newPassword",
//       label: "New Password",
//       type: "password",
//       placeholder: "New Password...",
//       autoComplete: "new-password",
//     },
//     {
//       name: "confirmPassword",
//       label: "Confirm Password",
//       type: "password",
//       placeholder: "Confirm Password...",
//       autoComplete: "new-password",
//     },
//   ],
//   loginPage: [
//     {
//       name: "email",
//       label: "Email",
//       type: "email",
//       placeholder: "Email address...",
//       autoComplete: "email",
//     },
//     {
//       name: "password",
//       label: "Password",
//       type: "password",
//       placeholder: "Password",
//       autoComplete: "password",
//     },
//   ],
//   signupPage: [
//     {
//       name: "username",
//       label: "Username",
//       type: "text",
//       placeholder: "Username..",
//       autoComplete: "username",
//     },
//     {
//       name: "email",
//       label: "Email",
//       type: "email",
//       placeholder: "Email address...",
//       autoComplete: "email",
//     },
//     {
//       name: "password",
//       label: "Password",
//       type: "password",
//       placeholder: "Password",
//       autoComplete: "current-password",
//     },
//     {
//       name: "confirmPassword",
//       label: "Confirm Password",
//       type: "password",
//       placeholder: "Confirm Password",
//       autoComplete: "new-password",
//     },
//   ],
// };

// type FormSlug = keyof typeof FORM_CONFIGS;

const useFormFields = ({ slug }: IProps) => {
  const profileFields = (): IFormField[] => [
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
      name: "biography",
      label: "Biography",
      type: "textarea",
      placeholder: "Biography...",
      autoComplete: "biography",
    },
    {
      name: "headline",
      label: "Headline",
      type: "text",
      placeholder: "Headline...",
      autoComplete: "headline",
    },
  ];
  const socialFields = (): IFormField[] => [
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
  ];

  const passwordFields = (): IFormField[] => [
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
  ];

  const loginFields = (): IFormField[] => [
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
  ];

  const signupFields = (): IFormField[] => [
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
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case "profile":
        return profileFields();
      case "social":
        return socialFields();
      case "password":
        return passwordFields();
      case "loginPage":
        return loginFields();
      case "signupPage":
        return signupFields();
      default:
        return [];
    }
  };

  return { getFormFields };
};

export default useFormFields;
