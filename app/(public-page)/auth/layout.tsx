import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerAuthSession } from "@/app/utils/helper/auth-helper";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await getServerAuthSession();
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
