"use server"
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!
  }
})
import crypto from "crypto"

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex")

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm"
]

const maxFileSize = 1024 * 1024 * 1

const profileMaxFileSize = 1024 * 1024 * 1
const chatMediaMaxFileSize = 1024 * 1024 * 5

// const

export async function getSignedURL(
  type: string,
  size: number,
  checksum: string,
  userId: string,
  uploadType: "profile" | "chatMedia"
) {
  if (!userId) {
    return { failure: "user not authenticated!" }
  }
  if (!acceptedTypes.includes(type)) {
    return { failure: "Invalid file type!" }
  }

  if (uploadType === "profile") {
    if (size > profileMaxFileSize) {
      return { failure: "Profile picture size should be under 1MB!" }
    }
  } else if (uploadType === "chatMedia") {
    if (size > chatMediaMaxFileSize) {
      return { failure: "Chat media size should be under 5MB!" }
    }
  }
  
  console.log("Before put")

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      user: userId
    }
  })

  console.log("putObjectCommand ", putObjectCommand)

  console.log("After put")
  console.log("Before getSignedUrl")

  const signedURL = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 3000
  })
  console.log("After getSignedUrl")
  return { success: { url: signedURL } }
}

export async function deleteMedia(mediaUrl: string, userId: string) {
  if (!userId) {
    return { failure: "user not authenticated!" }
  }
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: mediaUrl.split("/").pop()!
  })

  const response = await s3Client.send(deleteObjectCommand)
  console.log("deletion response", response)
}
