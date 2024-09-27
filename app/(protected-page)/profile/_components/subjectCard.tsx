"use client"

import { useEffect, useState } from "react";
import type { SubjectType, TeacherType } from "@/_data/type";
import { fetchTeacherById } from "@/app/utils/helper/api-helper";

export default function SubjectCard({ subject }: { subject: SubjectType }) {
    const [teacher, setTeacher] = useState<TeacherType & { subject: string | undefined }>()

    useEffect(() => {
        fetchTeacherById(subject.teacherId).then(data => setTeacher(data));
    }, [subject])

    return teacher ? (
        <div className="bg-slate-200 hover:shadow-md rounded-md p-3">
            <div className="flex justify-between items-center flex-col gap-2 w-full">
                <span className="text-gray-700 font-bold">{subject.name}</span>
                <p className="text-gray-700">
                    Teacher: {teacher.name}
                </p>
                <p className="text-gray-700">
                    Marks: {subject.mark}
                </p>
            </div>
        </div >
    ) : (
        <div>Loading...</div>
    )
}