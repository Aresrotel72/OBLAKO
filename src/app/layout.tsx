import type { Metadata } from "next"
import { Syne, Manrope } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AuthProvider from "@/components/auth/AuthProvider"
import SmoothScroll from "@/components/providers/SmoothScroll"
import ScrollProgress from "@/components/ui/ScrollProgress"
// import CustomCursor from "@/components/ui/CustomCursor"

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "OBLAKO — Мобильные аксессуары",
  description:
    "Магазин мобильных аксессуаров. Чехлы для iPhone, зарядные устройства, наушники. Бронируй онлайн — забирай в магазине.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${syne.variable} ${manrope.variable} ${GeistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
            <SmoothScroll>
              {/* <CustomCursor /> */}
              <ScrollProgress />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </SmoothScroll>
          </AuthProvider>
      </body>
    </html>
  )
}
