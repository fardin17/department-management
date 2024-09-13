"use client";
import { signOut } from "next-auth/react";
import React from "react";

function Logout() {
  return <button onClick={() => signOut()}>logout</button>;
}

export default Logout;
