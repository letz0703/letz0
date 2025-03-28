"use client";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ComponentProps, ReactNode} from "react";

type NavProps = {
  children: ReactNode;
};

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export function Nav({children}: NavProps) {
  return <nav>{children}</nav>;
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  //export function NavLink({href, children}: NavLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  );
}
