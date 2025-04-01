"use client";

import {useState, useEffect} from "react";
import Dashboard from "./Dashboard";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("admin-auth");
    if (stored === "true") setAuthenticated(true);
  }, []);

  const handleLogin = () => {
    if (inputPassword === ADMIN_PASSWORD) {
      localStorage.setItem("admin-auth", "true");
      setAuthenticated(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    setAuthenticated(false);
    setInputPassword("");
  };

  if (!authenticated) {
    return (
      <div className="p-6 flex flex-col items-start gap-4">
        <h1 className="text-white text-xl font-bold">관리자 로그인</h1>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={inputPassword}
          onChange={e => setInputPassword(e.target.value)}
          className="px-4 py-2 rounded border border-gray-500"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          로그인
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={handleLogout}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        로그아웃
      </button>
      <Dashboard />
    </div>
  );
}
