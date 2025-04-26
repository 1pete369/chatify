import { useChatContext } from "@/context/useChatContext"
import MessagesSkeleton from "@/skeletons/MessagesSkeleton"
import { Message } from "@/types/chatTypes"
import React, { useEffect, useRef } from "react"
import Image from "next/image"
import { useAuthContext } from "@/context/useAuthContext"

import { format } from "date-fns"

function formatDate(date: Date) {
  return format(date, "eeee, MMM d, yyyy") // example: Monday, Apr 22, 2025
}

function formatTime(date: Date) {
  return format(date, "h:mm a") // example: 2:45 PM
}

export default function MessageBox() {
  const {
    messages,
    isMessagesLoading,
    getMessages,
    selectedUser,
    subscribeToMessages,
    unSubscribeFromMessages
  } = useChatContext()
  const { authUser } = useAuthContext()

  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
      subscribeToMessages()
    }

    return () => unSubscribeFromMessages()
  }, [selectedUser])

  useEffect(() => {
    if (chatEndRef.current && messages)
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (isMessagesLoading) return <MessagesSkeleton />

  let lastDate = ""

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((message: Message) => {
        const isMe = message.senderId === authUser?._id
        const messageDate = formatDate(message.createdAt)
        const showDate = messageDate !== lastDate
        lastDate = messageDate

        return (
          <React.Fragment key={message._id}>
            {showDate && (
              <div className="text-center text-gray-500 text-sm my-4">
                {messageDate}
              </div>
            )}

            <div
              className={`relative flex ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-sm p-3 rounded-lg shadow-sm ${
                  isMe ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {/* Media Display */}
                {message.mediaType === "image" && (
                  <Image
                    src={message.mediaUrl as string}
                    alt="Image"
                    width={300}
                    height={300}
                    className="rounded-lg mb-2 h-auto w-[280px]"
                  />
                )}

                {message.mediaType === "video" && (
                  <video controls className="w-full rounded-lg mb-2">
                    <source src={message.mediaUrl} />
                  </video>
                )}

                {message.mediaType === "pdf" && (
                  <iframe
                    src={message.mediaUrl}
                    className="w-full h-48 rounded-lg mb-2"
                    title="PDF"
                  />
                )}

                {/* Text message */}
                {message.text && (
                  <p className={`${isMe ? "text-right" : "text-left"}`}>
                    {message.text}
                  </p>
                )}
                <p
                  className={`mt-1 text-xs ${
                    isMe
                      ? " text-right text-gray-300"
                      : " text-left text-gray-500"
                  } `}
                >
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </div>
          </React.Fragment>
        )
      })}
      <div ref={chatEndRef} />
    </div>
  )
}
