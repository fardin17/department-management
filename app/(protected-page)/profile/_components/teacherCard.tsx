"use client";

import type { TeacherType } from "@/_data/type";
import { fetchTeacherById } from "@/app/utils/helper/api-helper";
import { Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function TeacherCard({ id, showDepartment = true }: { id: string, showDepartment?: boolean }) {
  const [teacher, setTeacher] = useState<TeacherType & { subject: string | undefined }>();

  useEffect(() => {
    fetchTeacherById(id).then((data) => setTeacher(data));
  }, [id]);

  return teacher ? (
    <div className="bg-slate-200 hover:shadow hover:scale-[1.01] rounded-md p-3">
      <div className="flex justify-between items-center flex-col gap-2 w-full">
        <div className="size-12 bg-slate-500/20 rounded-full flex justify-center items-center">
          <User className="text-gray-700" size={25} />
        </div>
        <span className="text-gray-700 font-bold">{teacher.name}</span>
        {showDepartment ? (
          <p className="text-gray-700">
            {!teacher.department ? "N/A" : teacher.department}
          </p>
        ) : null}
        <p className="text-gray-700">
          {!teacher.subject ? "N/A" : teacher.subject}
        </p>
      </div>
    </div>
  ) : (
    <div className="p-4">
      <Loader2 className="animate-spin" size={18} />
    </div>
  );
}
