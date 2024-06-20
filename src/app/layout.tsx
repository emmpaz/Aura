import type { Metadata } from "next";
import { Chivo } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SongProvider } from "./lib/SongContextProvider";
import { SearchProvider } from "./lib/SearchContext";

const chiv = Chivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aura",
  description: "A music app.",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {id: string}
}>) {

  return (
    <html lang="en" data-theme="business">
      <UserProvider>
        <SongProvider>
          <SearchProvider>
            <body className={chiv.className}>
              {children}
              </body>
          </SearchProvider>
        </SongProvider>
      </UserProvider>
    </html>
  );
}
