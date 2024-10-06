import { fetchProfileByEmail } from "@/app/utils/helper/api-helper";
import { validateToken } from "@/app/utils/helper/validation-helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { email } = validateToken(req);
        const profileData = await fetchProfileByEmail(email);

        console.log(profileData)

        if (profileData.error) {
            console.log(profileData.error)
            return NextResponse.json({ message: profileData.error }, { status: profileData.error === "NOT_FOUND" ? 404 : 401 });
        }

        if (profileData.profile?.type === 'student') {
            console.log(profileData.profile)
            return NextResponse.json(profileData.profile);
        }

        return NextResponse.json(profileData.profile);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error getting profile data: ", error);
            return NextResponse.json({ message: "Failed to fetch profile data." }, { status: 500 });
        }
    }
}