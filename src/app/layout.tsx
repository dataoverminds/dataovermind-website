import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DataOverMind — Next-Generation AI Agency",
    template: "%s | DataOverMind",
  },
  description:
    "We design, develop, and deploy advanced AI systems that transform businesses. From machine learning pipelines to production-ready intelligent applications.",
  keywords: [
    "AI agency",
    "machine learning",
    "artificial intelligence",
    "AI development",
    "NLP",
    "computer vision",
    "data engineering",
    "AI consulting",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DataOverMind",
    title: "DataOverMind — Next-Generation AI Agency",
    description:
      "We design, develop, and deploy advanced AI systems that transform businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DataOverMind — Next-Generation AI Agency",
    description:
      "We design, develop, and deploy advanced AI systems that transform businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen flex flex-col w-full overflow-x-hidden font-sans antialiased">
        <Navbar />
        <main className="flex-1 flex flex-col w-full relative">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
