import type { Metadata } from "next";
import { Chivo } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const chiv = Chivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aura",
  description: "A music app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="business">
      <UserProvider>
        <body className={chiv.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
