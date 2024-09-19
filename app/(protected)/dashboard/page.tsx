import { getServerAuthSession } from "@/app/utils/helper/auth-helper";
import SelectType from "./selectType";
import { Database } from "@/_data/type";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (session?.user) {
    const userResponse = await fetch("http://localhost:4000/users");
    const allUsers = (await userResponse.json()) as Database["users"];

    const targetUser = allUsers.find(
      (user) => user.email === session!.user.email
    );

    if (targetUser && targetUser.type) {
      redirect(`/dashboard/${targetUser.type}`);
    }
  }

  return (
    <main className="w-full p-4">
      <div className="container mx-auto min-h-[90dvh] bg-white/10 rounded-xl flex justify-center items-center p-4 text-slate-50">
        <SelectType session={session} />
      </div>
    </main>
  );
}
