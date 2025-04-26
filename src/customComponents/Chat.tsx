"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { useAuthContext } from "@/context/useAuthContext"
import { useChatContext } from "@/context/useChatContext"
import ChatBoxContainer from "@/customComponents/ChatBoxContainer"
import EmptyChatBox from "@/customComponents/EmptyChatBox"
import Sidebar from "@/customComponents/Sidebar"
import { Menu, XIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function Chat() {
  const { authUser } = useAuthContext()
  const { selectedUser } = useChatContext()
  const [openSidebar, setOpenSidebar] = useState(false)

  if (!authUser) {
    redirect("/login")
  }

  return (
    <div className="h-screen grid grid-cols-10 mx-auto relative ">
      {/* SIDEBAR FOR DESKTOP */}
      <div className="hidden lg:block p-4 col-span-2 border-r border-neutral-500 bg-black/20 overflow-y-auto">
        <Sidebar />
      </div>

      {/* SIDEBAR SHEET FOR MOBILE */}
      {!selectedUser && (
        <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden absolute top-4 left-4 z-50 bg-black/30 text-white hover:bg-white hover:text-black"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-transparent border-none bg-black p-0">
            <SheetHeader className="h-screen">
              <Sidebar />
              <SheetTitle className="sr-only">Chat Sidebar</SheetTitle>
              <SheetDescription className="sr-only">
                Sidebar sheet
              </SheetDescription>
              <SheetClose className="absolute top-4 right-1 bg-accent-blue px-4 py-4 rounded-lg">
                <XIcon className="size-4" />
              </SheetClose>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}

      {/* CHAT SECTION */}
      <div className="col-span-10 lg:col-span-8 border-l border-neutral-500 bg-black/20 overflow-y-auto">
        {!selectedUser ? <EmptyChatBox /> : <ChatBoxContainer />}
      </div>
    </div>
  )
}
