"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {onUserStateChange} from "@/api/firebase";
//import { onUserStateChange } from '@/firebase/firebase'; // 경로는 환경에 맞게 수정하세요

export default function AdminLink() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onUserStateChange(user => {
      if (user?.uid === process.env.NEXT_PUBLIC_GOOGLE_ADMIN_UID) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="text-right">
      <Link
        href="/admin"
        className="inline-flex items-center text-sm text-blue-600 hover:underline"
      >
        Go to Admin Page
        <ArrowRight className="ml-1 size-4" />
      </Link>
    </div>
  );
}
