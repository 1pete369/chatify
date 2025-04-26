"use client"

import { axiosInstance } from "@/lib/axios"
import { authUserDataType } from "@/types/authTypes"
import { Message, MessageData } from "@/types/chatTypes"
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "./useAuthContext"

type ChatContextType = {
  users: authUserDataType[]
  messages: Message[]
  isMessagesLoading: boolean
  isUsersLoading: boolean
  selectedUser: authUserDataType | null
  setSelectedUser: Dispatch<SetStateAction<authUserDataType | null>>
  getUsers: () => Promise<void>
  getMessages: (userId: string) => Promise<void>
  sendMessage: (messageData: MessageData) => Promise<void>
  subscribeToMessages: () => void
  unSubscribeFromMessages: () => void
  setUsers: Dispatch<SetStateAction<authUserDataType[]>>
}

const chatContext = createContext<ChatContextType | null>(null)

export function ChatContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [users, setUsers] = useState<authUserDataType[] | []>([])
  const [messages, setMessages] = useState<Message[] | []>([])
  const [isMessagesLoading, setIsMessagesLoading] = useState(false)
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<authUserDataType | null>(
    null
  )

  const { webSocket } = useAuthContext()

  const getUsers = async () => {
    setIsUsersLoading(true)
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    try {
      const response = await axiosInstance.get("/messages/users")
      setUsers(response.data)
    } catch (error) {
      // @ts-expect-error
      toast.error(error.response.data.message)
    } finally {
      setIsUsersLoading(false)
    }
  }

  const getMessages = async (userId: string) => {
    try {
      setIsMessagesLoading(true)
      const response = await axiosInstance.get(`/messages/${userId}`)
      setMessages(response.data)
    } catch (error) {
      // @ts-expect-error
      toast.error(error.response.data.message)
    } finally {
      setIsMessagesLoading(false)
    }
  }

  const sendMessage = async (messageData: MessageData) => {
    if (!selectedUser) toast.error("something went wrong!")
    try {
      const res: any = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData
      )
      setMessages([...messages, res.data])
    } catch (error) {
      // @ts-expect-error
      toast.error(error.response.data.message)
    }
  }

  const subscribeToMessages = () => {
    const socket = webSocket
    socket?.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser?._id
      if (!isMessageSentFromSelectedUser) return

      setMessages((prevMessages: any) => [...prevMessages, newMessage])
    })
  }

  const unSubscribeFromMessages = () => {
    const socket = webSocket
    socket?.off("newMessage")
  }

  return (
    <chatContext.Provider
      value={{
        users,
        messages,
        isMessagesLoading,
        selectedUser,
        setSelectedUser,
        isUsersLoading,
        getUsers,
        getMessages,
        sendMessage,
        subscribeToMessages,
        unSubscribeFromMessages,
        setUsers
      }}
    >
      {children}
    </chatContext.Provider>
  )
}

export const useChatContext = () => {
  const context = useContext(chatContext)
  if (!context) {
    throw new Error("Chat Context should be used within its provider")
  }
  return context
}
