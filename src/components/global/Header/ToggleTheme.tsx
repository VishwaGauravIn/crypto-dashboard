"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full -mr-1"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}

      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
