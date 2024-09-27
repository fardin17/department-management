"use client";
import { SubjectType } from "@/_data/type";
import { Button } from "@/app/components/ui/button";
import Sidebar from "@/app/components/ui/sidebar";
import RequestButton from "@/app/components/ui/student-dashboard/requestButton";
import { useGetStudentInfoQuery } from "@/app/store/api-slice";
import { signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const MarksDistribution = dynamic(
  () => import("@/app/components/ui/student-dashboard/marksDistribution"),
  {
    ssr: false,
  }
);
const TeacherList = dynamic(
  () => import("@/app/components/ui/student-dashboard/teacherList"),
  { ssr: false }
);
const DownloadNotes = dynamic(
  () => import("@/app/components/ui/student-dashboard/downloadNotes"),
  { ssr: false }
);
const StudentCourseCard = dynamic(
  () => import("@/app/components/ui/student-dashboard/studentCourseCard"),
  {
    ssr: false,
  }
);

const StudentDashboard = () => {
  const [showTokenExpired, setShowTokenExpired] = useState(false);
  const { data: studentInfo, error } = useGetStudentInfoQuery({});

  useEffect(() => {
    if (error?.data?.message?.name === "TokenExpiredError") {
      signOut();
    }
  }, [error]);

  const renderExpiredModal = showTokenExpired && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex flex-col gap-20">
          <h2 className="text-xl font-semibold text-center">
            Your Session Expired
          </h2>
          <Button
            className=""
            onClick={() => {
              signOut();
              Cookies.remove("access-token");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );

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
      {renderExpiredModal}
    </section>
  );
};

export default StudentDashboard;
