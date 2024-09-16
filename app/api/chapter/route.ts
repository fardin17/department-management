import { Database } from "@/_data/type";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { ...chapterInfo, email } = data;

  const userResponse = await fetch("http://localhost:4000/users");
  const allUsers = (await userResponse.json()) as Database["users"];
  const userId = allUsers.find((user) => user.email === email)?.id;

  const teacherResponse = await fetch("http://localhost:4000/teachers");

  const allTeachers = (await teacherResponse.json()) as any;

  const teacherInfo = allTeachers.find((teacher) => teacher?.id === userId);

  const updatedInfo = { ...teacherInfo, chapter: [...teacherInfo.chapter, chapterInfo] };

  const response2 = await fetch("http://localhost:4000/teachers", {
    method: "POST",
    body: JSON.stringify(updatedInfo),
    headers: { "Content-Type": "application/json" },
  });
}
