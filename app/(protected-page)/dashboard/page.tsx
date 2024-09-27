import { getServerAuthSession } from "@/app/utils/helper/auth-helper";
import TeacherDashboard from "./teacher";
import StudentDashboard from "./student";
import { getStudentById, getUserByEmail } from "@/app/utils/helper/api-helper";
import SelectAccountType from "./selectAccountType";
import SelectStudentDepartment from "./selectStudentDepartment";

const Dashboard = async () => {
  const session = await getServerAuthSession();
  const user = await getUserByEmail(session!.user.email);

  if (!user) {
    return (
      <div className="container mx-auto py-32 bg-white">
        <p className="text-center text-lg font-semibold text-gray-900">404 User Not Found.</p>
      </div>
    );
  }

  if (user.type === null) return <SelectAccountType session={session} />;
  if (user.type === "student") {
    const student = await getStudentById(user.id);

    if (!student) {
      return (
        <div className="container mx-auto py-32 bg-white">
          <p className="text-center text-lg font-semibold text-gray-900">404 Not Found.</p>
        </div>
      );
    }

    if (student.department === null) {
      return <SelectStudentDepartment id={user.id} />
    }
  }

  if (user?.type == "teacher") return <TeacherDashboard />;
  if (user?.type == "student") return <StudentDashboard />;

  return null;
};

export default Dashboard;
