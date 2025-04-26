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
import SelectedUserSkeleton from "@/skeletons/SelectedUserSkeleton"
import { ArrowLeft, User, XIcon } from "lucide-react"
import Image from "next/image"
import React, { useState } from "react"
import Sidebar from "../Sidebar"

export default function ChatHeader() {
  const { selectedUser } = useChatContext()
  const { onlineUsers } = useAuthContext()
  const [open, setOpen] = useState(true) // Sheet will be open by default


  if (!selectedUser)
    return (
      <div className=" p-2 w-full">
        <SelectedUserSkeleton />
      </div>
    )

  return (
    <div className="border-b-white border-b-1 px-2">
      <div
        className="flex text-start items-center  space-x-2 font-medium bg-transparent select-none  rounded-lg transition-all py-2 px-1"
        key={selectedUser._id}
      >
        <Sheet>
          <SheetTrigger asChild >
            <Button className=" lg:hidden outline-none bg-none bg-transparent hover:bg-transparent">
              <ArrowLeft />
            </Button>
          </SheetTrigger>
          <SheetContent  className="border-transparent border-none">
            <SheetHeader className="h-screen bg-black border-none border-transparent outline-none outline-transparent">
              <Sidebar />
              <SheetTitle className=" sr-only">
                Chat Sidebar
              </SheetTitle>
              <SheetDescription className=" sr-only">
                Sidebar sheet
              </SheetDescription>
            <SheetClose className="absolute top-4 right-1 bg-accent-blue px-4 py-4  rounded-lg"><XIcon className="size-4"/></SheetClose>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        {selectedUser.profilePic ? (
          <Image
            src={selectedUser.profilePic}
            height={44}
            width={44}
            alt="profile_pic"
            className=" h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center bg-slate-700 h-12 w-12  rounded-full shrink-0">
            <User className="h-6 w-6 rounded-full" />
          </div>
        )}
        <div className="flex flex-col w-full">
          <p className=" text-ellipsis line-clamp-1">{selectedUser.fullName}</p>
          <p className="text-sm text-neutral-400">
            {onlineUsers.includes(selectedUser._id) ? "online" : "offline"}
          </p>
        </div>
      </div>
    </div>
  )
}
