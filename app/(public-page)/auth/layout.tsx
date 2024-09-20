import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/app/utils/helper/auth-helper";

export default async function layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  // console.log({ session });
  if (session) redirect("/dashboard");
  return (
    <div>
      <nav className=" flex gap-2">
        <Link href="/login">Login</Link>
        <Link href="/sign-up">Sign-UP</Link>
      </nav>
      {children}
    </div>
  );
}
