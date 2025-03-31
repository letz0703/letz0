"use client";

import {signIn, signOut, useSession} from "next-auth/react";

export default function LoginButton() {
  const {data: session} = useSession();

  return session ? (
    <div className="flex gap-2 items-center">
      <p>Welcome, {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  ) : (
    <button onClick={() => signIn("google")}>Sign in with Google</button>
  );
}
