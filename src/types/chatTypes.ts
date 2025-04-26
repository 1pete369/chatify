export type MessageData = {
  text: string
  mediaUrl: string
  mediaType: string | null
}

export type Message = {
  _id : string
  text: string
  mediaUrl: string
  mediaType: string | null
  senderId: string
  receiverId: string
  createdAt: Date
  updatedAt: Date
}
