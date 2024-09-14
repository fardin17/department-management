import React from "react";

// import { getServerAuthSession } from "../api/auth/[...nextauth]/route";
import Logout from "./logout";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../utills/helper/auth-helper";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log("first");
  console.log({ session });
  if (!session) redirect("/auth/sign-up");
  return (
    <div>
      Dashboard
      <Logout />
    </div>
  );
};

export default Page;
