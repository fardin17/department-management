import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { validateToken } from "@/app/utils/helper/validation-helper";
import { fetchTeacherById } from "@/app/utils/helper/api-helper";

export async function GET(req: NextApiRequest) {
  try {
    const { id } = validateToken(req);
    console.log({ id });
    const teacherData = await fetchTeacherById(id);
    console.log({ teacherData });
    if (!teacherData) {
      return NextResponse.json({ message: "User info not found!" }, { status: 404 });
    } else {
      return NextResponse.json({ ...teacherData });
    }
  } catch (error) {
    console.error("Error updating teacher data:", error);
    return NextResponse.json({ message: "Failed to update teacher data." }, { status: 500 });
  }
}
