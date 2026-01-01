import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import BackgroundScene from "@/components/3d/BackgroundScene";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import { PortfolioProvider } from "@/context/PortfolioContext";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cyberpunk 3D Portfolio",
  description: "Immersive 3D Portfolio with Next.js, Three.js, and Framer Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                // Suppress console.error for AbortErrors
                const originalError = console.error;
                console.error = (...args) => {
                  if (args[0]?.name === 'AbortError' || 
                      args[0]?.message?.includes('aborted') ||
                      args[0]?.includes?.('AbortError')) {
                    return;
                  }
                  originalError.apply(console, args);
                };

                // Suppress unhandled rejections for AbortErrors
                window.addEventListener('unhandledrejection', (event) => {
                  if (event.reason?.name === 'AbortError' || 
                      event.reason?.message?.includes('aborted')) {
                    event.preventDefault();
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${orbitron.variable} ${rajdhani.variable} antialiased bg-[#0A0E27] text-white overflow-x-hidden relative`}
      >
        <PortfolioProvider>
          <SmoothScroll />
          <Navbar />
          <BackgroundScene />
          <main className="relative z-10 flex flex-col min-h-screen">
            {children}
          </main>
        </PortfolioProvider>
      </body>
    </html>
  );
}
