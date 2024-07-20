"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import React from "react";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full -mr-1"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      suppressHydrationWarning
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" suppressHydrationWarning />
      ) : (
        <Moon className="h-5 w-5" suppressHydrationWarning />
      )}

      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
