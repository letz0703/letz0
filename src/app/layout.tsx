import {cn} from "@/lib/utils";
import {Inter} from "next/font/google";
import "./globals.css";
import {Nav, NavLink} from "./components/Nav";
import {Button} from "@/components/ui/button";
import {TbPencilCheck} from "react-icons/tb";
const inter = Inter({subsets: ["latin"], variable: "--font-sans"});
import {SessionProvider} from "next-auth/react";
import {Providers} from "./providers";
import LoginButton from "./components/LoginButton";

// src/app/layout.tsx
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-green-400 min-h-screen font-sans antialiased overflow-x-hidden p-2 font-semibold",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
