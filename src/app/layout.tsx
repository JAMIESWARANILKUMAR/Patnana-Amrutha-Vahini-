import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import ScrollEffects from "@/components/ScrollEffects";
import FloatingIcons from "@/components/FloatingIcons";

export const metadata: Metadata = {
  title: "Patnana Amrutavahini | Portfolio",
  description: "AI & ML enthusiast — projects in computer vision, FastAPI and front-end development.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;900&family=Plus+Jakarta+Sans:wght@700;800&family=Space+Grotesk:wght@700&family=Syne:wght@800&family=Unbounded:wght@900&family=Noto+Sans:wght@400;500&family=Noto+Sans+Devanagari:wght@400;500&family=Noto+Sans+Telugu:wght@400;500&family=Noto+Sans+Tamil:wght@400;500&family=Noto+Sans+Bengali:wght@400;500&family=Noto+Sans+Kannada:wght@400;500&family=Noto+Sans+Malayalam:wght@400;500&family=Noto+Sans+Gujarati:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/Amrutha.jpeg" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <CustomCursor />
        <ScrollEffects />
        <FloatingIcons />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
