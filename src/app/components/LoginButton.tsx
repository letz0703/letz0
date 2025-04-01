"use client";

import {useEffect, useState} from "react";
import {login, logout, onUserStateChange} from "@/api/firebase";
import {User} from "firebase/auth";
import {useSession} from "next-auth/react";

export default function LoginButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onUserStateChange(setUser); // ✅ 중복 변수명 제거
  }, []);

  return (
    <>
      {!user && (
        <button onClick={login} className="text-white px-4 py-2">
          Login
        </button>
      )}
      {user && (
        <button onClick={logout} className="text-white px-4 py-2">
          Logout
        </button>
      )}
    </>
  );
}
