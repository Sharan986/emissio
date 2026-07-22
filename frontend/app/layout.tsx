import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emissio — Carbon Accounting for Manufacturers",
  description:
    "Emissio helps manufacturing companies measure, manage, and report carbon emissions. Replace spreadsheets and consultants with one unified sustainability platform.",
  keywords: [
    "carbon accounting",
    "sustainability reporting",
    "manufacturing emissions",
    "ESG reporting",
    "Scope 1 emissions",
    "Scope 2 emissions",
    "climate tech",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full overflow-x-hidden`}>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden bg-[#09090b]">{children}</body>
    </html>
  );
}
