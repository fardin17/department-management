import { getServerAuthSession } from "@/app/utils/helper/auth-helper";
import Sidebar from "@/app/components/ui/sidebar";
import AddLessonButton from "@/app/components/ui/teacher-dashboard/add-lesson-button";
import dynamic from "next/dynamic";

const ClassesCompletionChart = dynamic(() => import("@/app/components/ui/teacher-dashboard/classes-completion-chart"), {
  ssr: false,
});

const ProgressChart = dynamic(() => import("@/app/components/ui/teacher-dashboard/progress-chart"), { ssr: false });

const NotesList = dynamic(() => import("@/app/components/ui/teacher-dashboard/subject-note"), { ssr: false });

const TeacherCourseCard = dynamic(() => import("@/app/components/ui/teacher-dashboard/teacher-course-card"), {
  ssr: false,
});

const TeacherDashboard = () => {
  const session = getServerAuthSession();
  console.log({ session });

  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex h-[90vh] max-w-[1400px] w-full mx-auto rounded-lg shadow-lg">
        {/* Left Sidebar */}
        <aside className="w-64 bg-gray-50 p-6 space-y-4 rounded-l-lg drop-shadow-lg">
          <Sidebar></Sidebar>
        </aside>

        <div className="flex-1 px-8 text-black overflow-y-auto">
          {/* Headline */}
          <div className="flex justify-between bg-white py-3 px-2 rounded-lg">
            <div className="flex items-center">
              <div className="w-4 h-8 rounded-md bg-[#F8C7B0] mr-4"></div>
              <h1 className="text-xl font-bold">Design Science</h1>
            </div>
            <AddLessonButton></AddLessonButton>
          </div>

          {/* Course Card */}
          <div className="flex gap-2 mt-2">
            <TeacherCourseCard />
            <TeacherCourseCard />
            <TeacherCourseCard />
          </div>

          <div>
            <ClassesCompletionChart></ClassesCompletionChart>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 p-6 space-y-4 rounded-r-lg overflow-y-auto">
          <ProgressChart />

          <NotesList />
        </div>
      </div>
    </section>
  );
};

export default TeacherDashboard;
