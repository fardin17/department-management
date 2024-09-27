"use client";

import Image from "next/image";
import { useGetProfileInfoQuery } from "@/app/store/api-slice";
import { DEFAULT_FALLBACK_IMAGE_URL } from "@/assets/constants";
import { BookUser, Loader2, UserPen } from "lucide-react";
import Link from "next/link";
import TeacherCard from "./teacherCard";
import Students from "./students";
import SubjectCard from "./subjectCard";
import { useEffect, useState } from "react";
import { fetchDepartment } from "@/app/utils/helper/api-helper";
import { SubjectType } from "@/_data/type";

export default function Profile() {
  const { data: profile, isLoading, error } = useGetProfileInfoQuery();
  const [subjects, setSubjects] = useState<SubjectType[]>()
  const [mySubject, setMySubject] = useState<SubjectType>()

  useEffect(() => {
    if (!profile || profile.department === null) return;

    fetchDepartment({ department: profile.department }).then(data => {
      setSubjects(data[0].subjects.map(item => ({ ...item })));
      setMySubject(data[0].subjects.map(item => ({ ...item })).find(item => item.teacherId === profile.id));
    })
  }, [profile])

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-[93dvh] flex justify-center items-center w-full">
        <Loader2 size={35} className="animate-spin text-gray-800" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-gray-100 min-h-[93dvh] flex justify-center items-center w-full font-bold text-2xl text-red-500">
        Error loading profile
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-[93dvh]">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3 relative">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <Image
                  src={profile.image ?? DEFAULT_FALLBACK_IMAGE_URL}
                  alt={profile.name}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  height={400}
                  width={400}
                />

                {/* Name */}
                <h1 className="text-2xl font-bold text-sky-600">
                  {profile.name}
                </h1>

                {/* type chip */}
                {profile.type === "student" ? (
                  <p className="absolute top-4 right-3 px-3 font-semibold py-1.5 text-xs bg-pink-400 rounded-full">
                    Student
                  </p>
                ) : (
                  <p className="absolute top-4 right-3 px-3 font-semibold py-1.5 text-xs bg-blue-400 rounded-full">
                    Teacher
                  </p>
                )}

                {/* About */}
                <div className="text-center">
                  <p className="text-gray-600 flex justify-center items-center gap-2 font-semibold text-base">
                    {profile.department}
                  </p>
                  <p className="text-gray-600 font-semibold text-sm">
                    {profile.email}
                  </p>
                  {profile.type === "teacher" ? (
                    <p className="text-sky-700 flex justify-center items-center gap-2 font-semibold text-sm">
                      {mySubject?.name} ({mySubject?.mark})
                    </p>
                  ) : null}
                </div>

                <div className="mt-6 w-full flex flex-wrap gap-4 justify-center">
                  {/*TODO: */}
                  <Link
                    href={"/dashboard"}
                    className="bg-gray-300 hover:bg-gray-400 justify-center text-gray-700 flex-1 py-2 px-4 rounded flex items-center gap-2"
                  >
                    <UserPen size={18} />
                    Edit
                  </Link>
                  <Link
                    href={"/dashboard"}
                    className="bg-blue-500 hover:bg-blue-600 justify-center text-white py-2 flex-1 px-4 rounded flex items-center gap-2"
                  >
                    <BookUser size={18} />
                    Dashboard
                  </Link>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />

              {/* Subjects | chapters */}
              <div className="flex flex-col">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                  {profile.type === "teacher" ? "Chapters" : "Subjects"}
                </span>
                {profile.type === "teacher" ? (
                  profile.chapter?.length > 0 ? (
                    <ul>
                      {profile.chapter.slice(0, 4).map((chapter) => (
                        <li key={chapter.id} className="mb-2 text-gray-800">
                          <p className="line-clamp-1">
                            {chapter.title} - {chapter.lessonCount} lessons ({chapter.duration}min)
                          </p>
                        </li>
                      ))}
                      <Link
                        href={"/dashboard"}
                        className="text-gray-700 text-sm font-semibold underline"
                      >
                        View all ({profile.chapter.length})
                      </Link>
                    </ul>
                  ) : (
                    <p className="text-gray-500">No chapters available.</p>
                  )
                ) : profile.subjects.length > 0 ? (
                  <ul>
                    {profile.subjects.map((subject) => (
                      <li key={subject.id} className="mb-2 text-gray-700">
                        <p className="line-clamp-1">{subject.name} - {subject.mark} marks</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No subjects available.</p>
                )}
              </div>

              <hr className="my-6 border-t border-gray-300" />

              {/* Notes Section */}
              <div className="space-y-3">
                <h3 className="text-gray-700 uppercase font-bold tracking-wider">
                  Notes
                </h3>
                {profile.notes?.length > 0 ? (
                  <ul className="space-y-2 w-full">
                    {profile.notes.slice(0, 4).map((note, idx) => (
                      <li
                        key={idx}
                        className="text-gray-700 bg-slate-100 p-1.5 rounded-md"
                      >
                        <div className="mb-2 font-semibold flex w-full justify-between items-center gap-2 text-gray-700">
                          <p>{note.subject}</p>
                          <p> - </p>
                          <p className="text-sm font-semibold">{note.date}</p>
                        </div>
                        <p className="p-1 w-full rounded-sm bg-slate-200/90 line-clamp-1">
                          {note.note}
                        </p>
                      </li>
                    ))}
                    <Link
                      href={"/dashboard"}
                      className="text-gray-700 text-sm font-semibold underline"
                    >
                      View all ({profile.notes.length})
                    </Link>
                  </ul>
                ) : (
                  <div className="text-gray-500">No notes available.</div>
                )}
              </div>
            </div>
          </div>

          {/* Right side contents */}
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              {profile.type === "student" ?
                <>
                  <h2 className="text-xl text-gray-800 font-bold mb-4">
                    My Subjects
                  </h2>
                  <div className="text-gray-700">
                    {profile.type === "student" ? (
                      <div className="grid grid-cols-3 gap-4">
                        {profile.subjects.map((subject) => (
                          <SubjectCard key={subject.id} subject={subject} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No subjects available.</p>
                    )}
                  </div>
                </>
                : null}


              {/* Experience Section for Teachers */}
              {profile.type === "teacher" && profile.chapter?.length > 0 && (
                <>
                  <h2 className="text-xl text-gray-800 font-bold pb-4">Chapters</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {profile.chapter.slice(0, 4).map((chapter) => (
                      <div key={chapter.id} className="bg-slate-200 hover:shadow hover:scale-[1.01] rounded-md p-3">
                        <div className="flex-col gap-2 w-full flex justify-center items-center">
                          <h2 className="text-gray-700 font-bold text-lg truncate w-full text-center">{chapter.title}</h2>
                          <p className="text-gray-700">
                            Lessons: {chapter.lessonCount}
                          </p>
                          <p className="text-gray-600">Duration: {chapter.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Teachers Section for Students */}
              {profile.type === "student" && profile.teachers?.length > 0 && (
                <>
                  <h2 className="text-xl font-bold pb-4 text-gray-800">
                    My Teachers
                  </h2>
                  <div className="grid grid-cols-4 gap-4">
                    {profile.teachers.map((teacher, idx) => (
                      <TeacherCard key={idx} id={teacher.id} />
                    ))}
                  </div>
                </>
              )}

              {/* Colleagues Section for Teacher */}
              {profile.type === "teacher" ? (
                <>
                  <h2 className="text-xl font-bold py-4 text-gray-800">
                    My Colleagues
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    {subjects ? subjects.map((sub, idx) => (
                      <TeacherCard key={idx} id={sub.teacherId} showDepartment={false} />
                    )) : (
                      <div className="p-4">
                        <Loader2 className="animate-spin" size={18} />
                      </div>
                    )}
                  </div>
                </>
              ) : null}

              {/* Students Section for Teachers */}
              {profile.type === "teacher" ? (
                <>
                  <h2 className="text-xl font-bold py-4 text-gray-800">
                    My Students
                  </h2>
                  <Students department={profile.department} />
                </>
              ) : null}

              {profile.type === "student" ? (
                <>
                  <h2 className="text-xl font-bold mt-6 mb-4 text-gray-800">
                    My Teachers
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    {profile.subjects.map(item => (
                      <TeacherCard key={item.id} id={item.teacherId} />
                    ))}
                  </div>
                </>
              ) : null}


              <div className="">
                <h2 className="text-xl font-bold mt-6 mb-4 text-gray-800">
                  My Notes
                </h2>
                {profile.notes.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {profile.notes.map((note, idx) => (
                      <div key={idx} className="bg-slate-100 hover:shadow-md rounded-md p-3">
                        <div className="flex justify-between items-center flex-col gap-2 w-full">
                          <h3 className="text-gray-700 font-bold">{note.title}</h3>
                          <div className="flex w-full items-center justify-between">
                            <p className="text-gray-700">
                              {note.subject}
                            </p>
                            <p className="text-gray-700">
                              {note.date}
                            </p>
                          </div>
                          <p className="bg-slate-200 p-2 w-full rounded-sm">
                            {note.note}
                          </p>
                        </div>
                      </div >
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">No notes yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
