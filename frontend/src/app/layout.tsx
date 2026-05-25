import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import InstallPopup from "@/components/InstallPopup";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klyr Analytics",
  description: "Premium Network Analytics Dashboard",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon-512x512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#845EF7",
  initialScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InstallPopup />
        {/* Anti-Ghosting Script for previous projects (vitals/etc) */}
        <Script id="clear-vitals" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for(let registration of registrations) {
                  registration.unregister();
                  console.log('Unregistered stray service worker');
                }
              });
            }
            // Clear any stray vital keys if they exist in local storage
            for (let i = 0; i < localStorage.length; i++){
                let key = localStorage.key(i);
                if (key && (key.includes('vital') || key.includes('patient'))) {
                    localStorage.removeItem(key);
                }
            }
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
