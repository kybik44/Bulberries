"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
interface ProvidersProps {
  children: ReactNode;
  session?: Session;
}

const Providers: FC<ProvidersProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
