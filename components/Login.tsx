"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { AuthUser } from "aws-amplify/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Login({ user }: { user?: AuthUser }) {
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
      router.refresh();
    }
  }, [user]);

  return null;
}

export default withAuthenticator(Login);