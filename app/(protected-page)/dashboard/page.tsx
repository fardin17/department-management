import { Database } from "@/_data/type";
import { getServerAuthSession } from "@/app/utils/helper/auth-helper";
import { redirect } from "next/navigation";
import SelectAccountType from "./selectAccountType";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  const userResponse = await fetch("http://localhost:4000/users");
  const allUsers = (await userResponse.json()) as Database["users"];

  const targetUser = allUsers.find(
    (user) => user.email === session!.user.email
  );

  if (targetUser?.type === null) {
    return (
      <div>
        <SelectAccountType />
      </div>
    );
  }

  if (targetUser?.type) redirect(`/dashboard/${targetUser?.type}`);
}
