"use client";

import {signIn, signOut, useSession} from "next-auth/react";

export default function LoginButton() {
  const {data: session} = useSession();

  return session ? (
    <div className="flex gap-2 items-center">
      <p>Welcome, {session.user?.email}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  ) : (
    <button onClick={() => signIn("google")} className="bg-red-700 p-2">
      Login
    </button> // ✅ 텍스트 수정
  );
}
