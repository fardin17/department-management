import { NextResponse } from "next/server";
import axios from "axios";
import { DBUserType } from "@/_data/type";
import { SignInAPISchema } from "../schema/auth";
import { comparePasswords, generateAccessToken } from "@/app/utils/helper/validation-helper";
import { fetchAllUsers } from "@/app/utils/helper/api-helper";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if the body is empty
    if (!body) return NextResponse.json({ message: "No data received." }, { status: 400 });

    // Validate request body
    const { success, data, error } = SignInAPISchema.safeParse(body);
    if (!success) return NextResponse.json({ message: "Invalid data received.", error }, { status: 400 });

    const { email, provider, name, password, image } = data;

    const allUsers = await fetchAllUsers();
    const existingUser = allUsers.find((user) => user.email === email);

    if (provider === "google") {
      // Handle Google provider
      if (!existingUser) {
        const newUser: DBUserType = {
          id: crypto.randomUUID(),
          email,
          name: name!,
          provider,
          terms: true,
          type: null,
          image: image ?? null,
        };

        try {
          const { data: createdUser } = await axios.post(`http://localhost:4000/users`, newUser);
          const accessToken = generateAccessToken(createdUser);

          return NextResponse.json({ email: createdUser.email, name: createdUser.name, accessToken }, { status: 200 });
        } catch (error) {
          return NextResponse.json({ message: "Failed to create user." }, { status: 500 });
        }
      } else {
        const accessToken = generateAccessToken(existingUser);
        return NextResponse.json({ email: existingUser.email, name: existingUser.name, accessToken }, { status: 200 });
      }
    } else if (provider === "credentials" && existingUser) {
      // Handle credentials provider
      const isPasswordCorrect = await comparePasswords(password!, existingUser.password!);
      if (isPasswordCorrect) {
        const accessToken = generateAccessToken(existingUser);
        return NextResponse.json({ email: existingUser.email, name: existingUser.name, accessToken }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
      }
    }

    return NextResponse.json({ message: "User not found or invalid provider." }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error: (error as Error).message }, { status: 500 });
  }
}
