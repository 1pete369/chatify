"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuthContext } from "@/context/useAuthContext"
import { useChatContext } from "@/context/useChatContext"
import SidebarSkeleton from "@/skeletons/SidebarSkeleton"
import { authUserDataType } from "@/types/authTypes"
import { PowerOff, User, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Sidebar() {
  const { isUsersLoading, users, getUsers, setSelectedUser } =
    useChatContext()
  const [onlyOnlineUsers, setOnlyOnlineUsers] = useState(false)

  const { onlineUsers, logout } = useAuthContext()

  useEffect(() => {
    getUsers()
  }, [])

  const filteredUsers = onlyOnlineUsers
    ? users.filter((user: authUserDataType) =>
        onlineUsers.includes(user._id as string)
      )
    : users

  const handleCheck = (checked: boolean) => {
    setOnlyOnlineUsers(checked)
  }

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <div className="flex flex-col h-full w-full space-y-2">
      <div className="flex gap-4 items-center bg-slate-800 h-12 rounded-lg px-4 mr-10 lg:mr-0">
        <Users className="h-5 w-5" />
        <p className="text-lg">Contacts</p>
      </div>
      <div className="flex gap-2 items-center text-neutral-500 px-2">
        <span>{onlineUsers.length - 1} online user(s)</span>
        <Checkbox
          checked={onlyOnlineUsers}
          onCheckedChange={(checked) => handleCheck(checked as boolean)}
        />
      </div>
      <div className="flex-1 flex-col space-y-2 overflow-y-auto">
        {filteredUsers.map((user: authUserDataType) => {
          return (
            <Button
              className="flex text-start w-full space-x-2 bg-transparent select-none hover:bg-slate-800 rounded-lg transition-all py-7 px-1 cursor-pointer"
              key={user._id}
              onClick={() => setSelectedUser(user)}
            >
              <div className="relative flex items-center justify-center bg-slate-700 h-12 w-12  rounded-full shrink-0">
                {user.profilePic ? (
                  <Image
                    src={user.profilePic}
                    height={44}
                    width={44}
                    alt="profile_pic"
                    className=" h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 rounded-full" />
                )}
                {onlineUsers.includes(user._id) && (
                  <div className="size-3 rounded-full bg-success absolute right-0 bottom-0 ring-2 ring-slate-800 "></div>
                )}
              </div>
              <div className="flex flex-col w-full">
                <p className=" text-ellipsis line-clamp-1 text-base font-medium">
                  {user.fullName}
                </p>
                <p className="text-sm text-neutral-400">
                  {onlineUsers.includes(user._id) ? "online" : "offline"}
                </p>
              </div>
            </Button>
          )
        })}
        {filteredUsers.length === 0 && (
          <div className="h-full w-full flex justify-center items-center">
            <p className="text-neutral-500">No online users</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 bottom-0 w-full ">
        <Link href={"/"}>
          <Button className="bg-secondary-500 hover:bg-secondary-800 cursor-pointer w-full px-2 py-3 rounded-sm">
            Go Home
          </Button>
        </Link>
        <Button
          onClick={logout}
          className="bg-secondary-500 hover:bg-secondary-800 cursor-pointer  w-full px-2 py-3 rounded-sm"
        >
          <PowerOff /> Logout
        </Button>
      </div>
    </div>
  )
}
