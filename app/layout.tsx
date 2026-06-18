import type { Metadata } from "next";
import localFont from "next/font/local";
import { Rethink_Sans, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const libreCaslon = localFont({
  src: [
    {
      path: "../public/fonts/libre_caslon_condensed/fonts/webfonts/LibreCaslonCondensed-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/libre_caslon_condensed/fonts/webfonts/LibreCaslonCondensed-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/libre_caslon_condensed/fonts/webfonts/LibreCaslonCondensed-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/libre_caslon_condensed/fonts/webfonts/LibreCaslonCondensed-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/libre_caslon_condensed/fonts/webfonts/LibreCaslonCondensed-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/libre_caslon_condensed/fonts/webfonts/LibreCaslonCondensed-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/libre_caslon_condensed/fonts/webfonts/LibreCaslonCondensed-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/libre_caslon_condensed/fonts/webfonts/LibreCaslonCondensed-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-heading",
});

const rethinkSans = Rethink_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Golden Garden",
  description: "Golden Garden",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreCaslon.variable} ${rethinkSans.variable} ${poppins.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
