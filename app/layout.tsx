import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: {
    default: "Omar Mohamed Fahem | Full Stack Developer & Creative Entrepreneur",
    template: "%s | Omar Mohamed Fahem",
  },
  description:
    "Portfolio of Omar Mohamed Fahem, a Full Stack Web Developer and Founder of Weza Production. Specialized in Next.js, AI innovations, and creative digital solutions.",
  keywords: [
    "Omar Mohamed Fahem",
    "Full Stack Developer",
    "Weza Production",
    "AI Innovator",
    "Web Development Egypt",
    "Next.js Developer",
    "Creative Entrepreneur",
  ],
  authors: [{ name: "Omar Mohamed Fahem" }],
  creator: "Omar Mohamed Fahem",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omarportfolios.vercel.app/",
    title: "Omar Mohamed Fahem | Full Stack Developer & Creative Entrepreneur",
    description:
      "Passionate about creating innovative digital solutions and leading creative projects.",
    siteName: "Omar Mohamed Fahem Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Mohamed Fahem | Full Stack Developer",
    description: "Creative digital solutions and AI innovations.",
    creator: "@OmaR_WezA",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head />
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
