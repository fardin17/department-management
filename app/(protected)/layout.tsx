import React from "react";
import Link from "next/link";
import Logout from "../../components/logout";
import { getServerSession } from "next-auth";
import { authOptions } from "../utills/helper/auth-helper";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // console.log({ session });
  if (!session) redirect("/auth/login");
  return (
    <div>
      <div className="bg-sky-500">
        <nav className="container mx-auto py-4 px-4 flex justify-between">
          <div className=" flex gap-2">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
          </div>
          <Logout />
        </nav>
      </div>
      {children}
    </div>
  );
}
