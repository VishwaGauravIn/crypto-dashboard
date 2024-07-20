"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

export default function Account() {
  const { data, status } = useSession();
  const pathname = usePathname();

  const handleLogin = () => {
    signIn("google", {
      callbackUrl: pathname,
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={status === "loading"}>
        <Button variant="secondary" size="icon" className="rounded-full">
          {data?.user?.image ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={data?.user?.image} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          ) : (
            <CircleUser className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {status === "authenticated" && (
          <DropdownMenuLabel>{data?.user?.name}</DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        {status === "authenticated" && (
          <DropdownMenuItem>Settings</DropdownMenuItem>
        )}
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {status === "unauthenticated" ? (
          <DropdownMenuItem onClick={() => handleLogin()}>
            Login
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
