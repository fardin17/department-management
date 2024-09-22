import { getServerAuthSession } from "@/app/utils/helper/auth-helper";
import TeacherDashboard from "./teacher";
import StudentDashboard from "./student";
import { getUserByEmail } from "@/app/utils/helper/api-helper";
import SelectAccountType from "./selectAccountType";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerAuthSession();

  if (!session?.user) return redirect("/auth/login");

  const user = await getUserByEmail(session.user.email);

  if (!user) redirect("/auth/login");
  if (user.type === null) return <SelectAccountType />;
  if (user.type == "teacher") return <TeacherDashboard />;
  if (user.type == "student") return <StudentDashboard />;

  return null;
};

export default Dashboard;
