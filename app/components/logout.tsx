"use client";

import { signOut } from "next-auth/react";
import React from "react";
import Cookies from "js-cookie";
import { type Session } from "next-auth";
import { Button } from "./ui/button";

function Logout({ session }: { session: Session }) {
  return (
    <Button
      className="bg-transparent hover:bg-sky-600"
      variant={"outline"}
      onClick={() => {
        signOut();
        Cookies.remove("access-token");
      }}
    >
      Log out
    </Button>
  );
}

export default Logout;
