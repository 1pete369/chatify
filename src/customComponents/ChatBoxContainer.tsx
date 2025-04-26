// ChatBoxContainer.tsx
"use client"

import React, { useCallback, useState, useEffect } from "react"
import ChatHeader from "./Chat/ChatHeader"
import MessageBox from "./Chat/MessageBox"
import InputBox from "./Chat/InputBox"

export default function ChatBoxContainer() {
  const [dragOver, setDragOver] = useState(false)
  const [droppedFile, setDroppedFile] = useState<File | null>(null)

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)

    const file = e.dataTransfer?.files?.[0]
    if (file) {
      setDroppedFile(file)
    }
  }, [])

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  useEffect(() => {
    window.addEventListener("dragover", handleDragOver)
    window.addEventListener("drop", handleDrop)
    window.addEventListener("dragleave", handleDragLeave)
    return () => {
      window.removeEventListener("dragover", handleDragOver)
      window.removeEventListener("drop", handleDrop)
      window.removeEventListener("dragleave", handleDragLeave)
    }
  }, [handleDrop, handleDragOver, handleDragLeave])

  return (
    <div className="relative h-screen flex flex-col select-none">
      {dragOver && (
        <div className="absolute inset-0 z-50 bg-black/30 border-4 border-dashed border-blue-500 pointer-events-none flex items-center justify-center text-white text-xl font-semibold">
          Drop file to upload
        </div>
      )}
      <ChatHeader />
      <MessageBox />
      <InputBox droppedFile={droppedFile} setDroppedFile={setDroppedFile} />
    </div>
  )
}
