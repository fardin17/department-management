"use client";

import type { DepartmentType } from "@/_data/type";
import { Button } from "@/app/components/ui/button";
import { fetchAllDepartments, updateStudentDepartments, updateStudentSubjects } from "@/app/utils/helper/api-helper";
import { cn } from "@/app/utils/helper/global-helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SelectStudentDepartment({ id }: { id: string }) {
    const [departments, setDepartments] = useState<DepartmentType[]>();
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentType["name"]>();
    const router = useRouter()

    async function handleConfirm() {
        if (!selectedDepartment) {
            toast.error("Please select a department first.", { position: "bottom-right" });
            return;
        }

        Promise.all([
            updateStudentSubjects({ department: selectedDepartment, id }),
            updateStudentDepartments({ id, department: selectedDepartment })
        ]).then(() => {
            toast.success("Successfully updated.", { position: "bottom-right" });
            router.refresh()
        }).catch((e) => {
            console.log("from SelectStudentDepartment: ", e)
            toast.error("Something went wrong.", { position: "bottom-right" });
        })
    }

    useEffect(() => {
        fetchAllDepartments().then(data => setDepartments(data));
    }, [id]);

    return departments ? (
        <div className="container mt-4 mx-auto min-h-[90dvh] bg-white/10 rounded-xl flex gap-8 justify-center flex-col items-center p-4 text-slate-50">
            <h2 className="text-center font-semibold text-2xl">
                Select your department
            </h2>
            <div className="grid grid-cols-3 gap-3">
                {departments.map((item) => (
                    <Button
                        className={cn(
                            "px-10 py-16 w-full text-lg font-semibold bg-gray-700/80 hover:bg-gray-700 rounded-md flex justify-center items-center",
                            selectedDepartment === item.name
                                ? "shadow-sm ring-sky-400 ring-2"
                                : ""
                        )}
                        key={item.id}
                        onClick={() => setSelectedDepartment(item.name)}
                    >
                        {item.name}
                    </Button>
                ))}
            </div>
            <Button size={"lg"} onClick={handleConfirm} className="bg-sky-600 hover:bg-sky-700 px-4 py-2">Confirm</Button>
        </div>
    ) : (
        <div className="">Loading...</div>
    );
}
