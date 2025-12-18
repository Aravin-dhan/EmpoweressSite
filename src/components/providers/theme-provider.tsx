"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  attribute?: "class" | "data-theme";
};

export function ThemeProvider({
  children,
  attribute = "class",
}: Props) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
