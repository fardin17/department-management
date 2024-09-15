import { getServerSession } from "next-auth";
import { authOptions } from "./utills/helper/auth-helper";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  else redirect("/dashboard");
  // return null;
}
