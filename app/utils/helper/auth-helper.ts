import { cookies } from "next/headers";
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DEFAULT_FALLBACK_IMAGE_URL } from "@/assets/constants";
import { SignInAPIBody } from "@/app/api/types/auth";

import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        const reqBody: SignInAPIBody = {
          provider: "credentials",
          email: credentials.email,
          password: credentials.password,
        };

        const { data } = await axios.post("http://localhost:3000/api/sign-in", reqBody);

        if (data) return data;

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
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      return user?.email ? true : "/auth/login";
    },
    async jwt({ token, user, account }) {
      if (user?.accessToken) {
        token.id = user.id;
        token.accessToken = user?.accessToken;
      }
      if (account?.provider === "google") {
        const reqBody: SignInAPIBody = {
          provider: "google",
          email: user.email!,
          name: user.name!,
          image: user.image ?? DEFAULT_FALLBACK_IMAGE_URL,
        };

        const { data } = await axios.post("http://localhost:3000/api/sign-in", reqBody);

        if (data) {
          token.accessToken = data.accessToken;
        } else {
          console.error("Failed to save Google user data");
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return { ...session };
    },
  },
  useSecureCookies: false,
};

export const getServerAuthSession = () => getServerSession(authOptions);
