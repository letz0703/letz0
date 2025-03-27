import "./globals.css";
// app/shop/layout.jsx
import {cn} from "@/lib/utils";
import {Inter} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata = {
  title: "Make It Simple - letz",
  description: "price info - CANMART, south KOREA"
};

export default function RootLayout({children}) {
  return (
    <html lang="ko">
      <body
        className={
          (cn("bg-background min-h-screen font-sans antialiased"),
          inter.variable)
        }
      >
        {children}
      </body>
    </html>
  );
}
