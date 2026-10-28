import localFont from "next/font/local";
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

export const metadata = {
  title: "nida — fullstack developer",
  description: "Fun projects, thoughtful code, and a little iced matcha. Explore Nida’s work as a fullstack developer.",
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
