import "./globals.css";
// app/shop/layout.jsx
import {cn} from "@/lib/utils";
import {Inter} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata = {
  title: "letz Shop Together",
  description: "Directly From Japan"
};

export default function RootLayout({children}) {
  return (
    <html lang="ko">
      <body
        className={cn(
          "bg-black min-h-screen font-sans antialiased",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
