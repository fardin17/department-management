"use client";

import { useForm } from "react-hook-form";
import { SignUpSchema, type SignUpSchemaType } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormFields } from "@/assets/formFields";
import { FormInput, FormInputErrorText } from "@/components/form-input";
import LogoSVG from "@/assets/logo";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (data?.user) router.push("/dashboard");
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      const response = await fetch("http://localhost:3000/api/sign-up", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        router.push("/auth/login");

        toast.success(JSON.stringify("Account created successfully."));
      }

      if (!response.ok) {
        toast.error(JSON.stringify("Sign Up failed"));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("From: SignUp Form", error.message);
        toast.error(`Filed to Sign Up, reason: ${error.message}`);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-md text-black"
    >
      <div className="translate-x-[3.1rem] scale-125 pb-5">
        <LogoSVG />
      </div>
      <h2 className="text-3xl font-bold">Create your account</h2>
      <p className="pb-3 text-sm font-semibold text-black/60">
        Enter your details to create your account
      </p>

      <div className="space-y-3 pb-3">
        {SignUpFormFields.map((item) => (
          <FormInput
            key={item.id}
            id={item.id}
            placeholder={item.placeholder}
            register={register}
            type={item.type}
            required={true}
            isError={!!errors[item.id]}
            errorMessage={errors[item.id]?.message ?? ""}
          />
        ))}
      </div>

      <div className="space-y-2 pb-3">
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            {...register("terms")}
            className="mr-2 h-4 w-4 bg-gray-100 text-indigo-700"
          />
          <label
            htmlFor="terms"
            className="text-sm font-semibold text-gray-500"
          >
            I accept the terms and conditions
          </label>
        </div>
        {errors.terms && (
          <FormInputErrorText message={errors.terms.message ?? ""} />
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-indigo-900 px-4 py-3 font-semibold tracking-wide text-white transition-all hover:bg-indigo-950 active:scale-105"
      >
        Sign Up
      </button>
    </form>
  );
}
