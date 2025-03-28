import {cn} from "@/lib/utils";
import {Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  title: "letz Shop Together",
  description: "Directly From Japan"
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body
        className={cn(
          `bg-green-400 min-h-screen font-sans antialiased ${geistSans.variable} ${geistMono.variable} antialiased`,
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
