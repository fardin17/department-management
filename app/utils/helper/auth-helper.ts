import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { SignInAPIBody } from "@/app/api/sign-in/route";
import { DEFAULT_FALLBACK_IMAGE_URL } from "@/assets/constants";

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
          password: credentials.password
        }

        const res = await fetch("http://localhost:3000/api/sign-in", {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();
        console.log("from authorize call", user);

        if (res.ok && user) return user;

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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const reqBody: SignInAPIBody = {
          provider: "google",
          email: user.email!,
          name: user.name!,
          image: user.image ?? DEFAULT_FALLBACK_IMAGE_URL
        };

        const res = await fetch("http://localhost:3000/api/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reqBody),
        });

        if (!res.ok) {
          console.error("Failed to save Google user data");
          return false; // Prevents sign in if saving user data fails
        }
      }

      return user?.email ? true : "/auth/login";
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      // if (!!account?.access_token && user.email) {
      //   const res = await fetch("http://localhost:3000/api/sign-in", {
      //     method: "POST",
      //     body: JSON.stringify({
      //       email: user.email,
      //       provider: account?.provider,
      //       access_token: account?.access_token,
      //     }),
      //     headers: { "Content-Type": "application/json" },
      //   });
      //   const result = await res.json();
      //   console.log({ result });
      //   token.accessToken = result.access_token;
      // }

      // console.log({ token });
      return token;
    },
    async redirect() {
      // console.log({ url, baseUrl });
      return "/dashboard";
    },
    async session({ session, token }) {
      // console.log({ token });
      session.accessToken = token.accessToken;
      return { ...session, name: "fardin" };
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
