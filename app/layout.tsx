import "./globals.css";
import type { Metadata } from "next";
import { Outfit, Bebas_Neue } from "next/font/google";
import { UserProvider } from "@/context/UserContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"]
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebasNeue",
  subsets: ["latin"],
  weight: '400'
});

export const metadata: Metadata = {
  title: "Run Findr",
  description: "Find Your Next Run",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${bebasNeue.variable} antialiased`}
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
