import { authOptions } from "@/app/utills/helper/auth-helper";
// import { NextAuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth";

// Define your NextAuth options

// The correct way to handle requests in the new Next.js App Router
const handler = NextAuth(authOptions);

// export const getServerAuthSession = () => getServerSession(authOptions);

// Export GET and POST handlers
export { handler as GET, handler as POST };
