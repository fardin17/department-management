import { z } from "zod";

export const SignInAPISchema = z
  .object({
    provider: z.enum(["credentials", "google"]),
    password: z.string().min(1).optional(), // only for credentials provider
    name: z.string().optional(), // only for google provider
    image: z.string().url().optional(), // only for google provider
    email: z.string().email(),
  })
  .superRefine(({ provider, password, name }, ctx) => {
    // If provider is 'credentials', ensure password is required
    if (provider === "credentials" && (!password || password === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required when using credentials",
        path: ["password"],
      });
    }

    // If provider is 'google', ensure name & image is required
    if (provider === "google" && (!name || name === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Name is required when using Google provider",
        path: ["name"],
      });
    }
  });
