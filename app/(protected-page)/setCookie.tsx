"use client";

import Cookies from "js-cookie";
import type { Session } from "next-auth";

/**
 * This purpose of this component is just to set cookies after logging in.
 */
export default function SetCookie({ session }: { session: Session }) {
  Cookies.set("access-token", session.accessToken!);

  return null;
}
