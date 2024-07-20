"use client";

import Link from "next/link";
import { Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ToggleTheme from "./ToggleTheme";
import Account from "./Account";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {HeaderLinkOptions.map((option) => (
          <HeaderLink key={option.href} {...option} pathname={pathname} />
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {HeaderLinkOptions.map((option) => (
              <HeaderLink key={option.href} {...option} pathname={pathname} />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <ToggleTheme />
        <Account />
      </div>
    </header>
  );
}

const HeaderLink = ({
  href,
  label,
  children,
  pathname,
  alternateActiveCheck,
}: {
  href: string;
  label?: string;
  pathname: string;
  children?: React.ReactNode;
  alternateActiveCheck?: string;
}) => {
  // if alternateActiveCheck is provided, use it to check for active state
  const active =
    pathname === "/"
      ? href === "/"
      : alternateActiveCheck
        ? href.includes(alternateActiveCheck)
        : href.includes(pathname.replace("/", ""));

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground",
        active === false && "text-muted-foreground",
      )}
    >
      {label || children}
    </Link>
  );
};

const HeaderLinkOptions = [
  {
    href: "/",
    label: "Dashboard",
  },
  {
    href: "#",
    label: "Orders",
  },
  {
    href: "#",
    label: "Products",
  },
  {
    href: "#",
    label: "Customers",
  },
  {
    href: "#",
    label: "Analytics",
  },
];
