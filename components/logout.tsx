"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

function Logout() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) router.push("/auth/login");
  }, [session]);

  return (
    <button
      onClick={() => {
        signOut();
        Cookies.remove("access-token");
      }}
    >
      logout
    </button>
  );
}

export default Logout;
