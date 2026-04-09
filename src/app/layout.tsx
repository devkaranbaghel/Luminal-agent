import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Luminal Agent | AI-Powered Autonomous Job Platform",
  description: "Define your professional identity for the autonomous agent and let Luminal Agent handle your job applications.",
};

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AuthGuard>
            {children}
          </AuthGuard>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#13131a',
                color: '#e8e8f0',
                border: '1px solid #1e1e2e',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
