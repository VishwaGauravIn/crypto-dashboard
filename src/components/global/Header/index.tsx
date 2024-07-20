"use client";

import Link from "next/link";
import { Menu, Package2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ToggleTheme from "./ToggleTheme";
import Account from "./Account";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { demoCoins, demoTrendingCoins } from "@/store/demoData";

export default function Header() {
  const pathname = usePathname();
  const searchData = demoCoins;
  const trendingCoins = demoTrendingCoins;
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-30">
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
          <div className="relative w-96">
            <Command className="rounded-lg border shadow-sm group relative">
              <CommandInput
                placeholder="Search coins"
                className="z-20 relative"
              />
              <CommandList className="h-0 group-focus-within:h-48 max-h-48 transition-all ease-in-out absolute top-8 group-focus-within:pt-4 shadow-md -z-10 rounded-b bg-white w-full">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Top Trending ️‍🔥">
                 {/* Top 5 trending coins */}
                  {trendingCoins.slice(0, 5).map((coin) => (
                    <CommandItem key={coin.item.id}>
                      <span>{coin.item.name} <span className="text-muted-foreground lowercase">({coin.item.symbol})</span></span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandGroup heading="All Coins">
                  {searchData.map((coin) => (
                    <CommandItem key={coin.id}>
                      <span>{coin.name} <span className="text-muted-foreground">({coin.symbol})</span></span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
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
        active === false && "text-muted-foreground"
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
