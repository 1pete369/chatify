"use client"

import { useAuthContext } from "@/context/useAuthContext"
import Chat from "@/customComponents/Chat"
import { redirect } from "next/navigation"

export default function ChatPage() {
  const { authUser } = useAuthContext()

  if (!authUser) {
    redirect("/login")
  }

  return (
    <div className=" min-h-screen overflow-hidden">
      <Chat />
    </div>
  )
}
