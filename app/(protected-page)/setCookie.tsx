"use client";

import Cookies from "js-cookie";
import { useSession } from "next-auth/react";

export default function SetCookie() {
  const { data: session } = useSession();
  if (session) {
    Cookies.set("access-token", session.accessToken!);
  }
  return null;
}
