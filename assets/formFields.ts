import type { SignInSchemaType, SignUpSchemaType } from "@/schema/authSchema";

type SignUpFormFieldType = {
  id: keyof SignUpSchemaType;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  required: boolean;
};

export const SignUpFormFields: SignUpFormFieldType[] = [
  {
    id: "name",
    type: "text",
    placeholder: "Jhon Doe",
    required: true,
  },
  {
    id: "email",
    type: "email",
    placeholder: "jhondoe@email.com",
    required: true,
  },
  {
    id: "password",
    type: "password",
    placeholder: "* * * * * * * *",
    required: true,
  },
];

type SignInFormFieldType = {
  id: keyof SignInSchemaType;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  required: boolean;
};

export const SignInFormFields: SignInFormFieldType[] = [
  {
    id: "email",
    type: "email",
    placeholder: "jhondoe@email.com",
    required: true,
  },
  {
    id: "password",
    type: "password",
    placeholder: "********",
    required: true,
  },
];
