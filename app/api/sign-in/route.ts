export async function POST(req: Request) {
  const userInfo = await req.json();
  console.log("userinfo", userInfo);

  return Response.json(userInfo);
}
