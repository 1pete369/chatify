import { deleteMedia, getSignedURL } from "@/actions/actions"
import { ComputeSHA256 } from "@/utils/mediaHelpers"
import axios from "axios"
import { SetStateAction } from "react"

export const handleUpload = async (
  media: File,
  userId: string,
  setProgress: React.Dispatch<SetStateAction<number>>,
  uploadType: "profile" | "chatMedia",
  updateProfile?: (data: { media: string }) => Promise<void>,
  profilePic?: string
) => {
  if (!userId) return
  try {
    // Compute checksum for the file
    const checksum = await ComputeSHA256(media)
    console.log("checksum", checksum)

    // Get the signed URL for uploading the media
    const signedURLResult = await getSignedURL(
      media.type,
      media.size,
      checksum,
      userId,
      uploadType
    )

    if (signedURLResult.failure) {
      console.log("Failed to get signed URL:", signedURLResult.failure)
      return { success: false, message: signedURLResult.failure }
    }

    const url = signedURLResult.success?.url
    if (!url) {
      console.log("Error: Signed URL is empty")
      return {
        success: false,
        message: "Error while uploading! Try again later"
      } // Return structured error response
    }

    // Upload the file to the signed URL
    const response = await axios.put(url, media, {
      headers: {
        "Content-Type": media.type
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setProgress(percentCompleted)
          console.log(`Upload progress in ts file: ${percentCompleted}%`)
        }
      }
    })

    if (response.status === 200) {
      if (signedURLResult.success) {
        const data = {
          media: signedURLResult.success?.url.split("?")[0]
        }
        // If the upload type is 'profile', update the user's profile
        if (uploadType === "profile" && updateProfile) {
          await updateProfile(data)

          // Handle deletion of the old profile pic if it's different
          if (profilePic && profilePic !== data.media) {
            try {
              console.log("Deleting previous profile pic")
              await deleteMedia(profilePic, userId)
            } catch (error) {
              console.log("Failed to delete previous pic:", error)
            }
          }
        }

        if (uploadType === "chatMedia") {
          // setting chat media message here
          console.log("In upload type chatMedia", uploadType, data)
          return { success: true, data }
        }
      }
    } else {
      console.log(
        "Error during upload process. Response status:",
        response.status
      )
      return {
        success: false,
        message: "Error during upload process. Try again later!"
      }
    }
  } catch (error) {
    console.log("Upload failed:", error)
    return { success: false, message: "An error occurred. Try again later!" }
  }
}
