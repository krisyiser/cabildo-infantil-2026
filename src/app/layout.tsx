import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cabildo Infantil Papantla 2026",
  description: "Voces pequeñas, y grandes ideas: Juntos y Juntas Limaxtum construimos nuestro municipio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
