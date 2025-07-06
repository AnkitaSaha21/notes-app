"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure this only renders on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || status === "loading") {
    return null; // Prevent hydration issues and flashing
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        📝 Notes App
      </Link>

      {session?.user ? (
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Hi, {session.user.name}</span>
          <button
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
