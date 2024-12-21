import {inter} from "./font";
import "./globals.css";

export const metadata = {
  title: "letz - best buy",
  description: "price info - CANMART, south KOREA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
