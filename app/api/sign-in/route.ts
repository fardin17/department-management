export async function POST(req: Request) {
  const userInfo = await req.json();
  // console.log("userinfo", userInfo);
  const userResponse = await fetch("http://localhost:4000/users");
  const allUsers = await userResponse.json();

  const checkUserAvailable = allUsers.find(
    (user: { email: string }) => user.email === userInfo.email
  );

  if (userInfo.provider === "google") {
    if (!checkUserAvailable) {
      fetch("http://localhost:4000/users", {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: { "Content-Type": "application/json" },
      });
    }

    return Response.json(userInfo);
  }

  if (checkUserAvailable) {
    if (checkUserAvailable.password === userInfo.password)
      return Response.json(userInfo);
    else return Response.json({ message: "User is not authenticated!" });
  }
  return Response.json({ message: "User is not authenticated!" });
}
