// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      uid?: string; // ✅ 우리가 추가한 uid
    };
  }

  interface JWT {
    uid?: string; // ✅ token.uid도 확장
  }
}
