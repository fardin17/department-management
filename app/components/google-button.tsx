"use client"

import Image from "next/image";
import google from "@/assets/images/google.png";
import { cn } from "@/app/utils/helper/global-helper";
import { signIn } from "next-auth/react";

export default function GoogleButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => signIn("google")}
      className={cn(
        "flex items-center justify-center gap-4 rounded-md border py-4 font-semibold text-black/70",
        className
      )}
    >
      <Image className="size-5" src={google} alt="google" />
      <span>Continue with Google</span>
    </button>
  );
}
