import { getServerAuthSession } from "@/app/utils/helper/auth-helper";
import TeacherDashboard from "./teacher";
import StudentDashboard from "./student";

const Dashboard = async () => {
  const session = await getServerAuthSession();
  return session?.user?.type == "teacher" ? <TeacherDashboard /> : <StudentDashboard />;
};

export default Dashboard;
