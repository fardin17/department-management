import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../utills/helper/auth-helper";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
