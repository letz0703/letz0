"use client";

import {signIn, useSession} from "next-auth/react";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function LoginPage() {
  const {data: session, status} = useSession();
  const router = useRouter();

  // 로그인된 상태면 홈으로 리디렉트
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-2xl font-bold mb-6">로그인</h1>
      <button
        onClick={() => signIn("google")}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Google로 로그인
      </button>
    </div>
  );
}
