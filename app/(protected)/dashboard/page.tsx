import React from "react";

// import { getServerAuthSession } from "../api/auth/[...nextauth]/route";
import Logout from "../../../components/logout";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../utills/helper/auth-helper";

const Page = async () => {
  return (
    <div>
      <div>This is dashboard</div>
    </div>
  );
};

export default Page;
