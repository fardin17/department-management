import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { validateToken } from "@/app/utils/helper/validation-helper";
import { fetchTeacherById, updateTeacherData } from "@/app/utils/helper/api-helper";

export async function POST(req: NextApiRequest) {
  try {
    const { id } = validateToken(req);
    const chapterInfo = req.body;

    const teacherData = await fetchTeacherById(id);

    if (!teacherData) {
      return NextResponse.json({ message: "User info not found!" }, { status: 404 });
    } else {
      teacherData.chapter = [...teacherData.chapter, chapterInfo];

      await updateTeacherData(teacherData.id, teacherData);

      return NextResponse.json({ message: "Successfully updated!" });
    }
  } catch (error) {
    console.error("Error updating teacher data:", error);
    return NextResponse.json({ message: "Failed to update teacher data." }, { status: 500 });
  }
}
