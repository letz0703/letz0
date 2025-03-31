import {cn} from "@/lib/utils";
import {Inter} from "next/font/google";
import "./globals.css";
import {Nav, NavLink} from "./components/Nav";
import {Button} from "@/components/ui/button";
import {TbPencilCheck} from "react-icons/tb";
const inter = Inter({subsets: ["latin"], variable: "--font-sans"});
import {SessionProvider} from "next-auth/react";
import {Providers} from "./providers";
import {login} from "../api/firebase";
import LoginButton from "./components/LoginButton";

export const metadata = {
  title: "letz Shop Together",
  description: "Directly From Japan"
};
export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-green-400 min-h-screen font-sans antialiased overflow-x-hidden p-2 font-semibold",
          inter.variable
        )}
      >
        <Providers>
          <Nav className="flex items-center justify-between gap-4 bg-red-100  border-b border-gray-300">
            <NavLink href="/" className="text-blue-600">
              Home
            </NavLink>
            <NavLink href="/products">Items</NavLink>
            <NavLink href="/carts">Carts</NavLink>
            <NavLink href="/products/new" className="flex items-center gap-2">
              <TbPencilCheck />
              <span>New</span>
            </NavLink>
            {/*<NavLink href="/login" onclick={}>
              Login
            </NavLink>*/}
            <LoginButton />
          </Nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
