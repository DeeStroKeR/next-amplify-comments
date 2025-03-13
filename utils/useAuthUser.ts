'use client'

import { useEffect, useState } from "react";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error getting user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, userLoading };
}
