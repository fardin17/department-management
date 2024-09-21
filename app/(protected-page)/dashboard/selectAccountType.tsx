"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/app/components/ui/button";
import { updateUserType } from "@/app/utils/helper/api-helper";

export default function SelectAccountType() {
  const [role, setRole] = useState<"student" | "teacher">();
  const router = useRouter();
  const { data: session } = useSession();

  const handleContinue = async () => {
    if (!role) {
      return toast.error("Please select your account type to continue");
    }

    const data = await updateUserType({
      type: role,
      email: session!.user.email,
    });

    if (data) {
      router.push(`/dashboard/${role}`);
    } else {
      console.error("Failed to update user:", data);
    }
  };

  return (
    <main className="w-full p-4">
      <div className="container mx-auto min-h-[90dvh] bg-white/10 rounded-xl flex justify-center items-center p-4 text-slate-50">
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
      </div>
    </main>
  );
}
