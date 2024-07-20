import Header from "@/components/global/Header";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-screen w-full flex-col", className)}>
      <Header />
      {children}
    </div>
  );
}
