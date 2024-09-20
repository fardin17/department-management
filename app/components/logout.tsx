"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Logout() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.user) router.push("/auth/login")
  }, [session])

  return <button onClick={() => signOut()}>logout</button>;
}

export default Logout;
