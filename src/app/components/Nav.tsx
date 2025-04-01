"use client";
import {onUserStateChange} from "@/api/firebase";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ComponentProps, ReactNode, useEffect, useState} from "react";

export function Nav({children}: {children: ReactNode}) {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-center px-4">
      {children}
    </nav>
  );
}

export function NavLink({
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "className"> & {className?: string}) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground",
        className // 외부에서 전달된 className도 포함
      )}
    />
  );
}
