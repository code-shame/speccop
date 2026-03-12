import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spec.cop",
  description: "AI that compares your finished GitHub PR against the original ticket. You built what now?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

