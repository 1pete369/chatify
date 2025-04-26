// InputBox.tsx
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAuthContext } from "@/context/useAuthContext"
import { useChatContext } from "@/context/useChatContext"
import { MessageData } from "@/types/chatTypes"
import { ImageIcon, Plus, Send } from "lucide-react"
import Image from "next/image"
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState
} from "react"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import toast from "react-hot-toast"
import { handleUpload } from "../FileUploader"

interface InputBoxProps {
  droppedFile: File | null
  setDroppedFile: React.Dispatch<React.SetStateAction<File | null>>
}

export default function InputBox({
  droppedFile,
  setDroppedFile
}: InputBoxProps) {
  const { authUser } = useAuthContext()
  const { sendMessage } = useChatContext()

  const [text, setText] = useState("")
  const [media, setMedia] = useState<File | null>(null)
  const [mediaType, setMediaType] = useState<string | null>(null)
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState("")
  const [isMediaUploading, setIsMediaUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Unified file handler
  const handleSelectedFile = (file: File) => {
    setMedia(file)
    const previewUrl = URL.createObjectURL(file)
    setMediaPreviewUrl(previewUrl)

    if (file.type.startsWith("image/")) {
      setMediaType("image")
    } else if (file.type.startsWith("video/")) {
      setMediaType("video")
    } else if (file.type === "application/pdf") {
      setMediaType("pdf")
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) handleSelectedFile(file)
    e.target.value = ""
  }

  // Handle global drop from parent
  useEffect(() => {
    if (droppedFile) {
      handleSelectedFile(droppedFile)
      setDroppedFile(null)
    }
  }, [droppedFile, setDroppedFile])

  const removeMedia = () => {
    setMediaPreviewUrl("")
    setMediaType(null)
    setMedia(null)
  }

  const handleMediaUpload = async () => {
    if (!media || !authUser) return
    try {
      setIsMediaUploading(true)
      const result = await handleUpload(
        media,
        authUser._id,
        setProgress,
        "chatMedia"
      )
      if (result?.success) {
        return result.data?.media as string
      } else {
        toast.error(result?.message as string)
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message)
    } finally {
      setIsMediaUploading(false)
    }
  }

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()
    if (isSending || (text.trim() === "" && !media)) return
    setIsSending(true)
    try {
      const uploadedUrl = await handleMediaUpload()
      const messageData: MessageData = {
        text: text.trim(),
        mediaType,
        mediaUrl: uploadedUrl as string
      }
      await sendMessage(messageData)
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message)
    } finally {
      setText("")
      removeMedia()
      setIsSending(false)
      setProgress(0)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }

  return (
    <div
      className={`relative w-full border-t ${
        isDragging ? "border-blue-400" : "border-white"
      } px-2 py-2`}
      onDragEnter={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setIsDragging(false)
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) handleSelectedFile(file)
      }}
    >
      <form
        className="relative flex items-center gap-2"
        onSubmit={handleSendMessage}
      >
        {/* Preview */}
        {media && mediaPreviewUrl && (
          <div className="absolute h-40 w-40 bg-slate-800 flex justify-center items-center -top-[170px] rounded-lg">
            {mediaType === "image" && (
              <Image
                src={mediaPreviewUrl}
                height={140}
                width={140}
                alt="preview"
                className="rounded-lg h-36 shrink-0 object-contain"
              />
            )}
            {mediaType === "video" && (
              <video
                autoPlay
                muted
                loop
                className="rounded-lg h-36 shrink-0 object-contain"
              >
                <source src={mediaPreviewUrl} />
              </video>
            )}
            {mediaType === "pdf" && (
              <iframe
                src={mediaPreviewUrl}
                title="PDF Preview"
                height={140}
                width={140}
                className="w-full h-auto rounded-lg border"
              />
            )}
            {isMediaUploading && (
              <div className="absolute inset-0 bg-slate-800/60">
                <CircularProgressbar
                  value={progress}
                  strokeWidth={10}
                  background={false}
                  styles={buildStyles({
                    strokeLinecap: "round",
                    pathColor: "#0af0af",
                    trailColor: "transparent"
                  })}
                  className="absolute inset-14"
                />
              </div>
            )}
            <Button
              onClick={removeMedia}
              className="absolute top-2 right-1 h-4 w-4 p-0"
            >
              <Plus size={10} className="rotate-45 text-white" />
            </Button>
          </div>
        )}

        <Label htmlFor="messageBox" className="sr-only">
          Message
        </Label>
        <input
          id="messageBox"
          ref={inputRef}
          type="text"
          className="flex-1 h-11 px-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-r-2 focus:border-r-white"
          placeholder="Enter message..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              e.currentTarget.form?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              )
            }
          }}
          value={text}
          disabled={isSending}
          autoComplete="off"
        />

        {/* File picker */}
        <div
          className={`relative h-12 w-12 rounded-sm ${
            mediaPreviewUrl ? "bg-green-500" : "bg-violet-500"
          }`}
        >
          <Label
            htmlFor="upload-image"
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            <input
              type="file"
              id="upload-image"
              className="hidden"
              accept="image/*,video/*,application/pdf"
              onChange={handleFileChange}
              disabled={!!media || isSending}
            />
            <ImageIcon />
          </Label>
        </div>

        <Button type="submit" className="h-12 w-12 rounded-sm bg-sky-500">
          <Send />
        </Button>
      </form>
    </div>
  )
}
