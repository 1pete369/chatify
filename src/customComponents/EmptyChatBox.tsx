import React from "react"

export default function EmptyChatBox() {
  return (
    <div className="h-[calc(100vh-80px)] flex justify-center items-center text-center  select-none">
      <div className="max-w-md">
        <img
          src="/logo.png" // You can use any illustration or leave it out
          alt="Start a conversation"
          className="mx-auto mb-6 w-40 h-40 opacity-70"
          draggable={false}
        />
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          Select a chat to start messaging
        </h2>
        <p className="text-gray-500">
          Your messages will appear here. Choose a contact to begin.
        </p>
      </div>
    </div>
  )
}
