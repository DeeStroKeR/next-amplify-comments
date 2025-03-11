"use client";

import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function Logout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <button
      onClick={async () => {
        setIsLoggingOut(true);
        await signOut();
        router.push("/");
        router.refresh();
      }}
      className="cursor-pointer text-black inline-block px-2 py-1 bg-white font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300k"
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}