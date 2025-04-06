import {NextRequest, NextResponse} from "next/server";
import {isValidPassword} from "./lib/isValidPassword";

export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {"WWW-Authenticate": "Basic"}
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  //return Promise.resolve(false);
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (authHeader == null) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  //isValidPassword(password, "sdfkdf");

  //return false;

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.HASHED_ADMIN_PASSWORD as string
    ))
  );
}

export const config = {
  matcher: "/admin/:path*"
};


//https://youtu.be/iqrgggs0Qk0?t=6326 WDS 강의 미들웨어. /admin 암호화