export async function POST(req: Request) {
  const userInfo = await req.json();
  console.log("userinfo", userInfo);

  const userResponse = await fetch("http://localhost:4000/users");
  const allUsers = await userResponse.json();

  const checkUserAvailable = allUsers.find((user: { email: string }) => user.email === userInfo.email);

  if (checkUserAvailable) return new Response(JSON.stringify({ message: "User is already exists" }), { status: 402 });

  if (userInfo) {
    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log({ result });
  }
  return Response.json(userInfo);
}
