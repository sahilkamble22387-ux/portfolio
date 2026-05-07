
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahil Kamble",
  description: "Portfolio for Sahil Kamble",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
