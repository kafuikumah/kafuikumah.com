import type { Metadata } from "next";
import { Inter, Lekton } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lekton = Lekton({
  variable: "--font-lekton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kafui Kumah",
  description: "Software Engineering Consultant",
  icons: {
    icon: "/avatar.png",
  },
  openGraph: {
    images: [{ url: "/og-bg.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          inter.variable,
          lekton.variable,
          "font-sans antialiased"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem themes={["light", "dark", "terminal", "system"]}>
          <Navigation />
          <main className="mx-auto max-w-[700px] px-6 py-32 min-h-screen font-sans">
            {children}
          </main>
          <div className="mx-auto max-w-[700px] px-6 font-sans">
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
