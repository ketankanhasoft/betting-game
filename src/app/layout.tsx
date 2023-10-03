// Next Imports
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Redux Import
import { Providers } from "./provider";

// Custom Compoenents
import HeaderComponent from "@/components/header";
import FooterComponent from "@/components/footer";

// Custom styles
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="bg-slate-900">
            <HeaderComponent />
          </div>
          {children}
          <FooterComponent />
        </Providers>
      </body>
    </html>
  );
}