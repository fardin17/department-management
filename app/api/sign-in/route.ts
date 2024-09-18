import { Database, DBUserType } from "@/_data/type";
import { comparePasswords } from "@/app/utils/helper/bcrypt";
import { NextResponse } from "next/server";
import { SignInAPISchema } from "../schema/auth";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body) return NextResponse.json({ message: "No data received." }, { status: 400 });

  // Validating the body
  const validatedData = SignInAPISchema.safeParse(body);
  if (validatedData.error) return NextResponse.json({ message: "Invalid data received." }, { status: 400 });

  // Database call
  const userResponse = await fetch("http://localhost:4000/users");
  const allUsers = (await userResponse.json()) as Database["users"];

  const checkUserAvailable = allUsers.find((user) => user.email === validatedData.data.email);

  // Specific to google provider
  if (validatedData.data.provider === "google") {
    if (!checkUserAvailable) {
      const { email, provider, name, image } = validatedData.data;
      const newUserData: DBUserType = {
        id: crypto.randomUUID(),
        email: email,
        name: name!,
        provider: provider,
        terms: true,
        type: null,
        image: image!,
      };

      try {
        const res = await fetch("http://localhost:4000/users", {
          method: "POST",
          body: JSON.stringify(newUserData),
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) return NextResponse.json({ email, name, password: validatedData.data.password }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: "Failed to create user." }, { status: 500 });
      }
    }

    return NextResponse.json({
      email: validatedData.data.email,
      name: validatedData.data.name,
      password: validatedData.data.password
    }, { status: 200 })
  }

  // Specific to credentials provider
  if (checkUserAvailable) {
    const isPasswordCorrect = await comparePasswords(validatedData.data.password!, checkUserAvailable.password!);
    console.log(isPasswordCorrect);
    if (isPasswordCorrect) {
      return NextResponse.json(
        {
          email: validatedData.data.email,
          name: validatedData.data.name,
          password: validatedData.data.password,
        },
        { status: 200 }
      );
    } else {
      console.log("not correct");
    }
  }

  return NextResponse.json({ message: "User not found!" }, { status: 404 });
}
