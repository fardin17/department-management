import { DBUserType } from "@/_data/type";
import {
  addTeacher,
  addUser,
  fetchAllUsers,
} from "@/app/utils/helper/api-helper";
import { hashPassword } from "@/app/utils/helper/validation-helper";
import { SignUpSchema } from "@/schema/authSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { message: "No data received." },
        { status: 400 }
      );
    }

    // Validating the data
    const { data: validatedUserInfo, error } = SignUpSchema.safeParse(body);
    if (error) {
      return NextResponse.json(
        { message: "Validation error by zod", details: error.errors },
        { status: 400 }
      );
    }

    const { email, name, password, terms } = validatedUserInfo;

    // Check if the user already exists
    const allUsers = await fetchAllUsers();
    const existingUser = allUsers.find((user) => user.email === email);

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    // Hash the password and prepare new user data
    const hashedPassword = await hashPassword(password);
    const newUser: DBUserType = {
      id: crypto.randomUUID(),
      email,
      name,
      provider: "credentials",
      terms,
      type: null,
      password: hashedPassword,
      image: null,
    };

    const createdUser = await addUser(newUser);

    // If both operations are successful, return a success response
    return NextResponse.json(
      { message: "User  created successfully.", createdUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error in sign-up route:",
      error instanceof Error ? error.stack : error
    );
    return NextResponse.json(
      { message: "An error occurred during the sign-up process." },
      { status: 500 }
    );
  }
}
