import Header from "@/components/global/Header";
import { cn } from "@/lib/utils";
import { fetchAllCoins } from "@/store/serverActions";
import React, { ReactNode } from "react";

export default async function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const searchData = await fetchAllCoins();
  return (
    <div className={cn("flex min-h-screen w-full flex-col", className)}>
      <Header searchData={searchData} />
      {children}
    </div>
  );
}
