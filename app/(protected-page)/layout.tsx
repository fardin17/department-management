import React from "react";
import Link from "next/link";
import Logout from "../components/logout";
import StoreProvider from "../provider/storeProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
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
    </StoreProvider>
  );
}
