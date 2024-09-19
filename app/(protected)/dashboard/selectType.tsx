"use client";

import { DBUserType, Student, Teacher, type Database } from "@/_data/type";
import { Button } from "@/components/ui/button";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function createObject(role: "student" | "teacher", targetUser: DBUserType) {
    if (role === "student") {
        return {
            id: targetUser!.id,
            department: null,
            name: targetUser!.name,
        } satisfies Student;
    }
    if (role === "teacher") {
        return {
            id: targetUser!.id,
            department: null,
            name: targetUser!.name,
            chapter: [],
            notes: [],
        } satisfies Teacher;
    }
}

export default function SelectType({ session }: { session: Session | null }) {
    const [role, setRole] = useState<"student" | "teacher">();
    const router = useRouter();

    const handleContinue = async () => {
        if (!role) {
            return toast.error("Please select your account type to continue");
        }

        const userResponse = await fetch("http://localhost:4000/users");
        const allUsers = (await userResponse.json()) as Database["users"];

        const targetUser = allUsers.find(
            (user) => user.email === session!.user.email
        );

        if (targetUser) {
            // Update the user type
            const typeResponse = await fetch(
                `http://localhost:4000/users/${targetUser.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...targetUser, type: role }),
                }
            );

            // Create student or teacher according the the type selected
            const body = createObject(role, targetUser);

            const response = await fetch(
                `http://localhost:4000/${role === "student" ? "students" : "teachers"}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            if (typeResponse.ok && response.ok) {
                router.refresh();
            } else {
                console.error(
                    "Failed to update user:",
                    typeResponse.json(),
                    response.json()
                );
            }
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
            <h2 className="text-xl font-bold mb-6 text-center text-gray-900">
                Please select your account type.
            </h2>

            <div className="flex flex-col space-y-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={role === "student"}
                        onChange={() => setRole("student")}
                        className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700 font-semibold">Student</span>
                </label>

                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="role"
                        value="teacher"
                        checked={role === "teacher"}
                        onChange={() => setRole("teacher")}
                        className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700 font-semibold">Teacher</span>
                </label>
            </div>

            <Button
                onClick={handleContinue}
                className="mt-6 w-full bg-blue-500 text-white font-semibold tracking-wide py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
                Continue
            </Button>
        </div>
    );
}
