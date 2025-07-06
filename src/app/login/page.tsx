'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-6 shadow mt-10 bg-white rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border w-full p-2 mb-4" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border w-full p-2 mb-4" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
    </form>
  );
}
