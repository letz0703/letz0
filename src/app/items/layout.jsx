// app/shop/layout.jsx
import {Inter} from "next/font/google";
import {cn} from "@/lib/utils";
import React from "react";

const inter = Inter({
  subsets: [`latin`],
  variable: "--font-inter"
});

const Layout = ({children}) => {
  return (
    <div
      className={cn(
        "bg-background min-h-screen font-sans antialiased",
        inter.variable
      )}
    >
      <header>{/*<h1>My Shop</h1>*/}</header>
      <main>{children}</main>
      <footer>{/*<p>Footer content</p>*/}</footer>
    </div>
  );
};

export default Layout;
