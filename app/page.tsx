import { getServerAuthSession } from "./utils/helper/auth-helper";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = getServerAuthSession();
  if (!session) redirect("/auth/login");
  return redirect("/dashboard");
}
