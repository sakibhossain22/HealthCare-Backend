import { v2 as cloudinary, UploadApiResponse } from "cloudinary"
import { envConfig } from "./env"
import AppError from "../app/ErrorHelpers/AppError"
import status from "http-status"

cloudinary.config({
    cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
    api_key: envConfig.CLOUDINARY_API_KEY,
    api_secret: envConfig.CLOUDINARY_API_SECRET
})
export const deleteFileFromCloudinary = async (url: string) => {
    try {
        const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)$/
        const match = url.match(regex)
        if (match && match[1]) {
            const publicId = match[1]
            await cloudinary.uploader.destroy(
                publicId,
                {
                    resource_type: "image"
                }

            )
            console.log(`File ${publicId} deleted from Cloudinary successfully. `);
        }
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error)
        throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to delete file from Cloudinary")
    }
}
export const uploadFileToCloudinary = async (buffer: Buffer, filePath: string): Promise<UploadApiResponse> => {
    try {
        if (!buffer || !filePath) {
            throw new AppError(status.BAD_REQUEST, "Buffer and file path are required for uploading to Cloudinary")
        }
        const extension = filePath.split(".").pop()?.toLowerCase()
        const fileNameWithoutExtension = filePath.split(".").slice(0, -1).join(".").toLocaleLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "")
        const uniqueName = Math.random().toString(36).substring(2) + "-" + Date.now() + "-" + fileNameWithoutExtension

        const folder = extension === "pdf" ? "pdfs" : "images"

        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: `ph-healthcare/${folder}`,
                    public_id: uniqueName,
                    resource_type: "auto"
                },
                (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result as UploadApiResponse)
                    }
                }
            ).end(buffer)
        })
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error)
        throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to upload file to Cloudinary")
    }
}

export const cloudinaryUploader = cloudinary