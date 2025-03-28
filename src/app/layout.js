import {cn} from "@/lib/utils";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"});

export const metadata = {
  title: "letz Shop Together",
  description: "Directly From Japan"
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-green-400 min-h-screen font-sans antialiased",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
