import type { DBUserType, Database } from "@/_data/type";
import { hashPassword } from "@/app/utils/helper/bcrypt";
import { SignUpSchema } from "@/schema/authSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body) return NextResponse.json({ message: "No data received." }, { status: 400 });

  // Validating the data
  const validatedUserInfo = SignUpSchema.safeParse(body);
  if (validatedUserInfo.error) return NextResponse.json({ message: "Validation error by zod" }, { status: 400 });

  // Database call
  const userResponse = await fetch("http://localhost:4000/users");
  const allUsers = await userResponse.json() as Database["users"];

  const checkUserAvailable = allUsers.find(item => item.email === validatedUserInfo.data.email)

  if (checkUserAvailable)
    return NextResponse.json(
      { message: "User is already exists" },
      { status: 402 }
    );

  try {
    const { email, name, password, terms } = validatedUserInfo.data;

    // hashing the raw password with bcryptjs
    const hashedPassword = await hashPassword(password)

    const newUserData: DBUserType = {
      id: crypto.randomUUID(),
      email: email,
      name: name,
      provider: "credentials",
      terms: terms,
      // TODO: 
      type: "student",
      password: hashedPassword,
      image: null
    }

    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify(newUserData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    console.log("From sign up route:", { result });

    if (response.ok) {
      return NextResponse.json({ result }, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("from sign-up route:", error.stack)
      return NextResponse.json({ message: "Failed to save user data" }, { status: 500 });
    }
  }
}
