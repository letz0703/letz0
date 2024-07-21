import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "i.etz",
  description: "make it simple",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
