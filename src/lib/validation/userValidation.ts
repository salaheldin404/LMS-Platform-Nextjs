import * as z from "zod";
export const basicInformationSchema = z.object({
  username: z.string(),
  email: z.string(),
  biography: z
    .string()
    .min(20, { message: "Biography must be at least 20 characters" })
    .max(500, { message: "Biography must be less than 500 characters" })
    .optional()
    .or(z.literal("")), // Allow empty string as a valid value

  headline: z
    .string()
    .max(60, { message: "Headline must be 60 characters or less" })
    .optional(),
});

// A helper to trim input values.
const trimString = z.preprocess(
  (arg) => (typeof arg === "string" ? arg.trim() : arg),
  z.string()
);

// GitHub: 1-39 characters; alphanumeric and hyphens; must start with an alphanumeric;
const githubSchema = trimString
  .default("")
  .refine(
    (username) =>
      username === "" ||
      /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username),
    {
      message:
        "Please provide a valid GitHub username (1-39 characters, alphanumeric and hyphens)",
    }
  );

// LinkedIn: 3-100 characters; alphanumeric and hyphens.
const linkedinSchema = trimString
  .default("")
  .refine(
    (username) => username === "" || /^[a-z0-9-]{3,100}$/i.test(username),
    {
      message:
        "Please provide a valid LinkedIn username (3-100 characters, alphanumeric and hyphens)",
    }
  );

// Facebook: 5-50 characters; alphanumeric and dots.
const facebookSchema = trimString
  .default("")
  .refine(
    (username) => username === "" || /^[a-z0-9.]{5,50}$/i.test(username),
    {
      message:
        "Please provide a valid Facebook username (5-50 characters, alphanumeric and dots)",
    }
  );

// Instagram: 1-30 characters; alphanumeric, dots, and underscores.
const instagramSchema = trimString
  .default("")
  .refine(
    (username) => username === "" || /^[a-zA-Z0-9._]{1,30}$/.test(username),
    {
      message: "Please provide a valid Instagram username (1-30 characters)",
    }
  );

// Combine the individual schemas into one socialMedia schema.
export const socialMediaSchema = z.object({
  github: githubSchema,
  linkedin: linkedinSchema,
  facebook: facebookSchema,
  instagram: instagramSchema,
});

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword == data.confirmPassword, {
    message: "Passwords don't match ",
    path: ["confirmPassword"],
  });
