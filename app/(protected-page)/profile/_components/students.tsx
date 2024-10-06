import { DepartmentType, StudentType } from "@/_data/type";
import { fetchAllStudent } from "@/app/utils/helper/api-helper";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Students({ department }: { department: DepartmentType["name"] | null }) {
    const [allStudents, setAllStudents] = useState<StudentType[]>();

    useEffect(() => {
        fetchAllStudent().then((data) => {
            setAllStudents(data.filter((item) => item.department === department));
        });
    }, [department]);

    return (
        <div className="grid grid-cols-4 text-gray-800 rounded-md">
            {allStudents?.slice(0, 4).map((student) => (
                <div key={student.id} className="text-center bg-slate-200 p-4 rounded-md flex justify-center items-center flex-col gap-1 hover:shadow hover:scale-[1.01]">
                    <div className="size-12 bg-slate-500/20 rounded-full flex justify-center items-center">
                        <User size={25} />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">{student.name}</p>
                    <p className="text-sm">{student.department}</p>
                </div>
            ))}
        </div>
    );
}
