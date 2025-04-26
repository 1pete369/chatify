"use client"

import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/useAuthContext"
import { redirect } from "next/navigation"
import toast from "react-hot-toast"

export default function HomePage() {
  const { authUser } = useAuthContext()

  if (!authUser) {
    redirect("/login")
  }

  return (
    <div className=" min-h-screen flex items-center justify-center overflow-hidden">
      <Button onClick={()=>{toast.success("you are home")}} className="bg-secondary-800 hover:bg-secondary-500">
        Click me
      </Button>
    </div>
  )
}
