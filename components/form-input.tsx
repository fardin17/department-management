"use client";

import { cn } from "@/app/utils/helper/global-helper";
import type { HTMLInputTypeAttribute } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

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
