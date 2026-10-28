import localFont from "next/font/local";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./theme.css";
import CustomCursor from "@/components/cursor";
import MotionProvider from "@/components/motion-provider";

const inter = localFont({
  src: "../public/fonts/inter-variable.ttf",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const rounded = localFont({
  src: "../public/fonts/fredoka-variable.ttf",
  variable: "--font-rounded",
  weight: "300 700",
  display: "swap",
});

const title = "nida — fullstack developer";
const description = "Fun projects, thoughtful code, and a little iced matcha. Explore Nida’s work as a fullstack developer.";
const sharingImage = {
  url: "/social/portfolio-card.png",
  width: 1200,
  height: 630,
  alt: "Nida — fullstack developer, with a pale blue pixel star and a low-poly cat holding matcha.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nida-porfolio.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "nida",
    type: "website",
    locale: "en_US",
    images: [sharingImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [sharingImage],
  },
  icons: {
    icon: [
      { url: "/pixel-star.svg", type: "image/svg+xml" },
      { url: "/icon.png?v=pixel-star", type: "image/png", sizes: "192x192" },
    ],
    apple: "/icon.png?v=pixel-star",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body id="top" className={`${inter.className} ${inter.variable} ${rounded.variable}`}>
        <MotionProvider>
          <CustomCursor />
          {children}
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}
