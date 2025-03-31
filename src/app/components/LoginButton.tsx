"use client";

import {useEffect, useState} from "react";
import {login, logout, onUserStateChange} from "@/api/firebase";
import {User} from "firebase/auth";

export default function LoginButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onUserStateChange(u => setUser(u ?? null)); // ✅ 중복 변수명 제거
  }, []);

  const handleLogin = () => login().then(u => setUser(u ?? null));
  const handleLogout = () => logout().then(() => setUser(null));

  return (
    <>
      {!user && (
        <button onClick={handleLogin} className="text-white px-4 py-2">
          Login
        </button>
      )}
      {user && (
        <button onClick={handleLogout} className="text-white px-4 py-2">
          Logout
        </button>
      )}
    </>
  );
}
