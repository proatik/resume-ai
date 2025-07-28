import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Navbar from "@/components/Navbar";

import { MainProvider } from "@/contexts/MainContext";
import { AuthProvider } from "@/contexts/AuthContext";

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <MainProvider>
            <Navbar />
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 3000 }}
            />
          </MainProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
