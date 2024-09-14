import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log({ credentials });
        const res = await fetch("http://localhost:3000/api/sign-in", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        console.log({ user });

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  //sign-in====>(session,token)
  callbacks: {
    async signIn({ user }) {
      return user?.email ? true : "/auth/login";
    },
    async jwt({ token, account, user }) {
      if (!!account?.access_token && user.email) {
        const res = await fetch("http://localhost:3000/api/sign-in", {
          method: "POST",
          body: JSON.stringify({ email: user.email, provider: account?.provider, access_token: account?.access_token }),
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        console.log({ result });
        token.accessToken = result.access_token;
      }
      console.log({ token });
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log({ url, baseUrl });
      return "/dashboard";
    },
    async session({ session, token }) {
      console.log({ token });
      session.accessToken = token.accessToken;
      return { ...session, name: "fardin" };
    },
  },
};
