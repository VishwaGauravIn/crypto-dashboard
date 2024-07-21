import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SessionProvider from "@/components/session-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import Container from "@/container/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description:
    "A Crypto Dashboard to check all details about crypo coins, global trends, news, market outlook, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Container>{children}</Container>
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
