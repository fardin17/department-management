import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string | null;
    email: string;
    token: string;
    accessToken: string | null;
    refreshToken: string;
    tokenType: string;
  }

  interface Session {
    user: {
      id: string | number;
      name: string | null;
      email: string;
      image: string;
    };
    accessToken: string | null;
    refreshToken: string;
    tokenExp: number;
    message: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string | number;
    name: string | null;
    email: string;
    token: string;
    tokenType: string;
    accessToken: string | null;
    refreshToken: string;
    tokenExp: number;
    message: string | null;
  }
}
