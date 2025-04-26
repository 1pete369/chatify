"use client"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/useAuthContext"
import { ArrowLeft, PowerOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { authUser, logout } = useAuthContext()

  const pathname = usePathname()

  if(pathname.startsWith("/chat")) return <></>

  if (["/login", "/signup"].some((route) => pathname.startsWith(route))) {
    
    return (
      <nav className="flex justify-between items-center fixed top-0 z-10 bg-neutral-800 border-b w-full px-4 py-5">
        <Image
          src={"/logo.png"}
          height={40}
          width={40}
          alt="logo"
          className="rounded-sm"
        />
        <Link href={"/"}>
          <Button className="bg-white text-black hover:bg-white hover:text-black">
            <ArrowLeft size={20} />
          </Button>
        </Link>
      </nav>
    )
  }

  return (
    <nav className="flex justify-between items-center fixed top-0 z-10 bg-neutral-800 border-b w-full px-4 py-5 text-white">
      <Image
        src={"/logo.png"}
        height={40}
        width={40}
        alt="logo"
        className="rounded-sm"
      />
      <ul className="flex flex-row items-center gap-2">
        <li>
          <Link href={"/"} className="hover:underline px-2">
            Home
          </Link>
        </li>
        <li>
          <Link href={"/profile"} className="hover:underline px-2">
            Profile
          </Link>
        </li>
        <li>
          <Link href={"/settings"} className="hover:underline px-2">
            Settings
          </Link>
        </li>
        <li>
          <Link href={"/chat"} className="hover:underline px-2">
            Chat
          </Link>
        </li>
        {authUser ? (
          <li>
            <Button
              variant={"outline"}
              className="bg-secondary-800 hover:bg-secondary-500 text-white hover:text-white "
              onClick={logout}
            >
              <PowerOff size={20} /> Logout
            </Button>
          </li>
        ) : (
          <li>
            <Link href={"/login"} className="">
              <Button
                variant={"outline"}
                className="bg-secondary-800 hover:bg-secondary-500 text-white hover:text-white "
              >
                Login
              </Button>
            </Link>
          </li>
        )}
        {!authUser && (
          <li>
            <Link href={"/signup"} className="">
              <Button
                variant={"outline"}
                className="bg-primary-800 hover:bg-primary-500 text-white hover:text-white"
              >
                Signup
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
