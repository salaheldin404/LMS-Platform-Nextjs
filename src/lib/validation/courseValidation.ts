import * as z from "zod";

export const basicCourseSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(60, "Title must be less than 60 characters"),
  subtitle: z
    .string()
    .min(1, "subtitle is required")
    .max(120, "SubTitle must be less than 120 characters"),

  // level:z.enum(["beginner", "intermediate", "advanced"]),
  level: z
    .string()
    // .trim()
    .min(1, "Level is required")
    .refine((val) => ["beginner", "intermediate", "advanced"].includes(val), {
      message: "Invalid level selected",
    }),
  price: z.number().min(0).optional(),
  free: z.boolean().optional(),
  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .refine(
      (val) => ["programming", "design", "marketing", "business"].includes(val),
      { message: "Invalid category selected" }
    ),
  thumbnail: z.union([
    z.object({
      public_id: z.string(),
      url: z.string(),
    }),
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "File size must be less than 5MB"
      )
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only JPEG, PNG, and WEBP formats are allowed"
      ),
  ]),
  // .optional()
  // .nullable()
  // .transform((value) => value ?? undefined),
});

export const advancedCourseSchema = z.object({
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters"),
  requirements: z
    .array(
      z.object({
        value: z
          .string()
          .min(1, "Requirement field cannot be empty")
          .max(120, "Requirement cannot exceed 120 characters"),
      })
    )
    // .transform((value) => value.map((item) => item.value))
    .refine(
      (value) => value.length >= 1,
      "At least 1 requirement objectives are required"
    ),

  willLearn: z
    .array(
      z.object({
        value: z
          .string()
          .min(1, "Learning field cannot be empty")
          .max(120, "Learning field must be less than 120 characters"),
      })
    )
    .refine((value) => value.length <= 8, "Maximum of 8 learning objectives")
    .refine(
      (value) => value.length >= 3,
      "At least three learning objectives are required"
    ),
});

export const curriculumCourseSchema = z.object({
  sections: z
    .array(
      z.object({
        _id: z.string(),
        title: z
          .string()
          .trim()
          .min(3, "Section title should be at least 3 characters"),
        lessons: z.array(
          z.object({
            title: z
              .string()
              .trim()
              .min(3, "Lesson title should be at least 3 characters"),
            _id: z.string(),
            video: z.union([
              z.object({
                assetId: z.string(),
                playbackId: z.string(),
                playbackUrl: z.string(),
                duration: z.number(),
              }),
              z
                .instanceof(File)
                .refine(
                  (file) => file.type.startsWith("video/"),
                  "Only video files are allowed"
                )
                .refine(
                  (file) => file.size <= 500_000_000, // ~500MB
                  "File size must be less than 500MB"
                ),
            ]),
          })
        ),
      })
    )
    .min(1, "At least one section is required"),
});
