import React from "react";
import Link from "next/link";
import Logout from "../components/logout";
import SetCookie from "./setCookie";
import { getServerAuthSession } from "../utils/helper/auth-helper";
import { redirect } from "next/navigation";
import StoreProvider from "../provider/storeProvider";
import SetAuthInfo from "../components/auth/setAuthInfo";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await getServerAuthSession();
  if (!session) redirect("/auth/login");

  return (
    <StoreProvider>
      <SetAuthInfo session={session} />
      <SetCookie session={session} />
      <div>
        <div className="bg-sky-500">
          <nav className="container mx-auto py-4 px-4 flex justify-between">
            <div className=" flex gap-2">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/profile">Profile</Link>
            </div>
            <Logout session={session} />
          </nav>
        </div>
        {children}
      </div>
    </StoreProvider>
  );
}
