import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/cursor";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: "nida.dev - my portfolio",
  description: "welcome to my portfolio :)",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
