import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/app/utils/helper/validation-helper";
import { fetchTeacherById } from "@/app/utils/helper/api-helper";

export async function GET(req: NextRequest) {
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
    console.error("Error in getting teacher data:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
