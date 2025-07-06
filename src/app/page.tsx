"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <main className="h-[600px] flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Notes App 📝</h1>
      <p className="text-lg mb-6">Create, edit, and manage your personal notes securely.</p>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : session?.user ? (
        <Link
          href="/dashboard"
          className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
        >
          Click to Access Your Notes
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      )}
    </main>
  );
}
