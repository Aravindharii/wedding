import type { Metadata } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cursive",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jiyajithin.netlify.app"),

  title: "Jiya & Jithin —  Invitation",
  description: "You are cordially invited to celebrate our journey to forever together.",

  openGraph: {
    title: "Jiya & Jithin —  Invitation",
    description: "You are cordially invited to celebrate our journey to forever together.",
    url: "https://jiyajithin.netlify.app",
    siteName: "Jiya & Jithin Invitation",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Jiya & Jithin  Invitation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Jiya & Jithin — Wedding Invitation",
    description: "You are cordially invited to celebrate our journey to forever together",
    images: ["/preview.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink font-sans antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
