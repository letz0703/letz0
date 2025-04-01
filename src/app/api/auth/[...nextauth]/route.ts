import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async jwt({token, account, profile}) {
      // 최초 로그인 시 account와 profile이 존재
      if (account && profile) {
        token.uid = profile.sub; // ✅ Google의 고유 ID
      }
      return token;
    },
    async session({session, token}) {
      session.user.uid = token.uid; // ✅ 세션에 uid 추가
      return session;
    }
  }
});

export {handler as GET, handler as POST};
