"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "halftone.theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    return savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
  };

  return (
    <Button variant="secondary" size="sm" onClick={toggle}>
      {isDark ? "Light Mode" : "Dark Mode"}
    </Button>
  );
}
