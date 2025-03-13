"use client";

import { Authenticator } from "@aws-amplify/ui-react";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Authenticator>
      {children}
    </Authenticator>
  );
}