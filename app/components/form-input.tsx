"use client";

import { cn } from "@/app/utils/helper/global-helper";
import { useState, type HTMLInputTypeAttribute } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";

type Props<T extends FieldValues> = {
  id: Path<T>;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  register: UseFormRegister<T>;
  required?: boolean;
  isError: boolean;
  errorMessage: string;
};

export function FormInput<T extends FieldValues>({
  id,
  type,
  placeholder,
  register,
  required,
  isError,
  errorMessage,
}: Props<T>) {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "password") {
    return (
      <div className="w-full space-y-2 relative">
        <input
          className={cn(
            "w-full appearance-none rounded border-2 border-indigo-500/40 px-3 py-3 text-sm font-semibold leading-tight text-gray-900 focus:outline-indigo-600",
            isError ? "border-rose-500" : ""
          )}
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(id, { required })}
        />
        <Button
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute px-3 py-3 right-1 -top-[0.25rem] z-10"
        >
          {showPassword ? (
            <Eye size={18} className="text-gray-700" />
          ) : (
            <EyeOff size={18} className="text-gray-700" />
          )}
        </Button>
        {isError ? <FormInputErrorText message={errorMessage} /> : null}
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <input
        className={cn(
          "w-full appearance-none rounded border-2 border-indigo-500/40 px-3 py-3 text-sm font-semibold leading-tight text-gray-900 focus:outline-indigo-600",
          isError ? "border-rose-500" : ""
        )}
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, { required })}
      />
      {isError ? <FormInputErrorText message={errorMessage} /> : null}
    </div>
  );
}

export function FormInputErrorText({ message }: { message: string }) {
  return <p className="text-sm italic text-red-500">{message}</p>;
}
