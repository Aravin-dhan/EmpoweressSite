import localFont from "next/font/local";

export const serif = localFont({
  variable: "--font-serif",
  display: "swap",
  src: [
    { path: "../../public/fonts/Playfair-400.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Playfair-500.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Playfair-600.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Playfair-700.ttf", weight: "700", style: "normal" },
  ],
});

export const sans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../../public/fonts/Inter-400.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Inter-500.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Inter-600.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Inter-700.ttf", weight: "700", style: "normal" },
  ],
});

export const mono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    { path: "../../public/fonts/JetBrainsMono-400.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/JetBrainsMono-500.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/JetBrainsMono-600.ttf", weight: "600", style: "normal" },
  ],
});

export const fontVariables = `${serif.variable} ${sans.variable} ${mono.variable}`;
