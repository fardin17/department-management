import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  email: z
    .string()
    .min(2, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Please accept the terms and conditions." }),
  }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
