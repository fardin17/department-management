"use client";
import Sidebar from "@/app/components/ui/sidebar";
import AddLessonButton from "@/app/components/ui/teacher-dashboard/add-lesson-button";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { useGetTeacherInfoQuery } from "@/app/store/api-slice";

const ClassesCompletionChart = dynamic(() => import("@/app/components/ui/teacher-dashboard/classes-completion-chart"), {
  ssr: false,
});

const ProgressChart = dynamic(() => import("@/app/components/ui/teacher-dashboard/progress-chart"), { ssr: false });

const NotesList = dynamic(() => import("@/app/components/ui/teacher-dashboard/subject-note"), { ssr: false });

const TeacherCourseCard = dynamic(() => import("@/app/components/ui/teacher-dashboard/teacher-course-card"), {
  ssr: false,
});

const TeacherDashboard = () => {
  const { data: session } = useSession();
  if (!!session?.accessToken) {
    Cookies.set("access-token", session?.accessToken);
  }
  const { data } = useGetTeacherInfoQuery({});
  console.log({ data });
  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex h-[90vh] max-w-[1400px] w-full mx-auto rounded-lg shadow-lg">
        {/* Left Sidebar */}
        <aside className="w-64 bg-gray-50 p-6 space-y-4 rounded-l-lg drop-shadow-lg">
          <Sidebar />
        </aside>

        <div className="flex-1 px-8 text-black overflow-y-auto">
          {/* Headline */}
          <div className="flex justify-between bg-white py-3 px-2 rounded-lg">
            <div className="flex items-center">
              <div className="w-4 h-8 rounded-md bg-[#F8C7B0] mr-4"></div>
              <h1 className="text-xl font-bold">Design Science</h1>
            </div>
            <AddLessonButton />
          </div>

          {/* Course Card */}
          <div className="flex gap-2 mt-2">
            {courses.map((course) => (
              <TeacherCourseCard {...course} key={course.id} />
            ))}
          </div>

          <div>
            <ClassesCompletionChart />
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

const courses = [
  {
    id: 1,
    title: "Chapter 1",
    lessons: [
      "Design thinking process",
      "Origin of design",
      "What is design science",
      "History of design thinking",
      "Design sequence significance",
    ],
    duration: "50 Min",
    lessonCount: 5,
  },
  {
    id: 2,
    title: "Chapter 2",
    lessons: [
      "Introduction to user experience",
      "Usability testing",
      "Wireframing basics",
      "Prototyping principles",
      "User-centered design",
    ],
    duration: "45 Min",
    lessonCount: 4,
  },
];
