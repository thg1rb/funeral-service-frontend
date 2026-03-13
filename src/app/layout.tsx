import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import AntProvider from "./ant-provider";
import { OrderProvider } from "../hooks/order-context";

export const metadata: Metadata = {
  title: "งานศพพลัส+",
  description: "บริการจัดงานศพครบวงจร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        <AntProvider>
          <OrderProvider>
            <Navbar />
            {children}
            <Footer />
          </OrderProvider>
        </AntProvider>
      </body>
    </html>
  );
}
