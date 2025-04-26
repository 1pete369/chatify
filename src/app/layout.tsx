import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/customComponents/Navbar"
import { AuthContextProvider } from "@/context/useAuthContext"
import { Toaster } from "react-hot-toast"
import { ChatContextProvider } from "@/context/useChatContext"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Chatify",
  description: "Chat in style!"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`bg-neutral-800 text-white ${inter.className}`}>
        <AuthContextProvider>
          <Navbar />
          <ChatContextProvider>{children}</ChatContextProvider>
        </AuthContextProvider>
        <Toaster />
      </body>
    </html>
  )
}
