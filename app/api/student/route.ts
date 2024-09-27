import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/app/utils/helper/validation-helper";
import { fetchStudentById } from "@/app/utils/helper/api-helper";

export async function GET(req: NextRequest) {
  try {
    const { id } = validateToken(req);
    const studentData = await fetchStudentById(id);
    if (!studentData) {
      return NextResponse.json({ message: "User info not found!" }, { status: 404 });
    } else {
      return NextResponse.json({ ...studentData });
    }
  } catch (error) {
    console.error("Error in getting student data:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
