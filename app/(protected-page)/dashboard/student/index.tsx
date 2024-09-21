"use client";
import { SubjectType } from "@/_data/type";
import Sidebar from "@/app/components/ui/sidebar";
import RequestButton from "@/app/components/ui/student-dashboard/requestButton";
import { useGetStudentInfoQuery } from "@/app/store/api-slice";
import dynamic from "next/dynamic";

const MarksDistribution = dynamic(() => import("@/app/components/ui/student-dashboard/marksDistribution"), {
  ssr: false,
});
const TeacherList = dynamic(() => import("@/app/components/ui/student-dashboard/teacherList"), { ssr: false });
const DownloadNotes = dynamic(() => import("@/app/components/ui/student-dashboard/downloadNotes"), { ssr: false });
const StudentCourseCard = dynamic(() => import("@/app/components/ui/student-dashboard/studentCourseCard"), {
  ssr: false,
});

const StudentDashboard = () => {
  const { data: studentInfo } = useGetStudentInfoQuery({});
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
              <h1 className="text-xl font-bold">My Subject</h1>
            </div>
            <RequestButton></RequestButton>
          </div>

          {/* Course Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {studentInfo?.subjects?.map((subject: SubjectType) => (
              <StudentCourseCard {...subject} key={subject.id} />
            ))}
          </div>

          <div>
            <MarksDistribution></MarksDistribution>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 p-6 space-y-4 rounded-r-lg overflow-y-auto">
          <TeacherList teachers={studentInfo?.teachers} />

          <DownloadNotes notes={studentInfo?.notes} />
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;
