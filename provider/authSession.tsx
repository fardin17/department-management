'use client';

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function AuthSessionProvider({ children, session }: { children: ReactNode, session: Session | null | undefined }) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}