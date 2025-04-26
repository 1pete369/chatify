"use client"
import { useAuthContext } from "@/context/useAuthContext"
import { handleUpload } from "@/customComponents/FileUploader"
import { authUserDataType } from "@/types/authTypes"
import { Camera, Loader2 } from "lucide-react"
import Image from "next/image"
import { redirect } from "next/navigation"
import React, { ChangeEvent, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import toast from "react-hot-toast"

export default function ProfilePage() {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
    setIsUpdatingProfile
  }: {
    authUser: authUserDataType | null
    isUpdatingProfile: boolean
    updateProfile: (data: { media: string }) => Promise<void>
    setIsUpdatingProfile: React.Dispatch<React.SetStateAction<boolean>>
  } = useAuthContext()

  if (!authUser) {
    redirect("/login")
  }

  const [image, setImage] = useState<File | null>(null)

  const [previewUrl, setPreviewUrl] = useState("")

  const [progress, setProgress] = useState(0)

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const previewUrl = URL.createObjectURL(file)
      setPreviewUrl(previewUrl)
    }
  }

  const handleSubmit = async () => {
    if (!image) return

    try {
      setIsUpdatingProfile(true)
      const result = await handleUpload(
        image,
        authUser._id,
        setProgress,
        "profile", // Assuming profile upload type
        updateProfile,
        authUser.profilePic
      )
      if (result) {
        if (result.success) {
          toast.success(result.message as string) // Show success message
        } else {
          toast.error(result.message as string) // Show error message
        }
      }
    } catch (error) {
      console.error("Upload failed:", error)
      toast.error("Upload failed. Try again later!")
    } finally {
      setIsUpdatingProfile(false)
      setImage(null)
      setPreviewUrl("")
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="flex flex-col gap-4">
        {/* <Avatar>
          <AvatarImage className=" h-40 w-40" src={authUser.profilePic} />
          <AvatarFallback className="text-black font-semibold h-40 w-40">{authUser.fullName.slice(0,1).toUpperCase()}</AvatarFallback>
        </Avatar> */}
        <div className="relative h-40 w-40 mx-auto">
          <div className="h-40 w-40 bg-green-100 mx-auto rounded-full overflow-hidden">
            {previewUrl || authUser.profilePic !== "" ? (
              <Image
                src={previewUrl || authUser.profilePic}
                height={100}
                width={100}
                className="h-full w-full object-cover"
                alt="profilePic"
                priority={true}
                quality={100}
              />
            ) : (
              <p className="text-8xl h-full text-black flex justify-center items-center">
                {authUser.fullName.slice(0, 1).toUpperCase()}
              </p>
            )}
          </div>
          <label
            className="flex items-center justify-center text-white bg-white absolute right-0 bottom-0 rounded-full h-10 w-10 border-4 border-neutral-800 cursor-pointer"
            htmlFor="upload-image"
          >
            <input
              type="file"
              id="upload-image"
              className="hidden"
              accept="image/*"
              onChange={handleImageSelect}
            />
            <Camera
              size={20}
              className={`text-black ${isUpdatingProfile && "animate-pulse"}`}
            />
            {/* <Image
              src={"/arrow.png"}
              height={40}
              width={40}
              alt="arrow"
              className="absolute -right-4 -bottom-4"
            /> */}
            {isUpdatingProfile && (
              <div className="absolute -inset-1">
                <CircularProgressbar
                  value={progress}
                  strokeWidth={10}
                  background={false}
                  styles={buildStyles({
                    strokeLinecap: "round",
                    pathColor: "#0af0af",
                    trailColor: "transparent"
                  })}
                />
              </div>
            )}
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lg">
            Name:
          </label>
          <input
            required
            type="text"
            id="name"
            className="rounded-sm text-neutral-400 cursor-not-allowed border-2 border-white/30 focus-within:border-primary-800 outline-none px-2 py-1.5 placeholder:text-neutral-500 min-w-60"
            placeholder="Enter name"
            autoComplete="off"
            disabled
            value={authUser.fullName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg">
            Email:
          </label>
          <input
            required
            type="email"
            id="email"
            className="rounded-sm text-neutral-400 cursor-not-allowed border-2 border-white/30 focus-within:border-primary-800 outline-none px-2 py-1.5 placeholder:text-neutral-500 min-w-60"
            placeholder="Enter email"
            autoComplete="off"
            disabled
            value={authUser.email}
          />
        </div>
        <button
          type="submit"
          className=" px-4 py-2 w-full bg-primary-800 text-white rounded-full over:bg-primary-500 focus:ring-2 focus:ring-black focus:outline-none transition-all min-w-[240px] flex justify-center disabled:bg-primary-500"
          onClick={handleSubmit}
          disabled={isUpdatingProfile}
        >
          {isUpdatingProfile ? (
            <p className="flex gap-2 items-center mx-auto">
              <Loader2 size={20} className="animate-spin" /> Loading...
            </p>
          ) : (
            "Update Profile"
          )}
        </button>
      </div>
    </div>
  )
}
