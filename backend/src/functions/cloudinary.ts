import cloudinary from "cloudinary";
import dotenv from "dotenv"
import { buffer } from "node:stream/consumers";
dotenv.config();

const cloud = cloudinary.v2

cloud.config({
    cloud_name: process.env.cloud_name as string,
    api_key: process.env.api_key as string,
    api_secret: process.env.api_secret as string
})

interface CloudinaryResponse {
    valid?: boolean
    error?: string
    url: string,
    public_id?: string
}

const uploadOnCloudinary = async (file: Buffer, folder_name: string, type: ("video" | "image" | "raw" | "auto")): Promise<CloudinaryResponse> => {
    return new Promise((resolve, reject) => {
        const result = cloud.uploader.upload_stream({
            folder: folder_name,
            type: type
        },
            (error, res) => {
                if (error) reject({ valid: false, error: error, url: "" })
                else resolve({ valid: true, url: res?.secure_url || "", public_id: `${res?.public_id}` })
            }
        )
        result.end(file)
    })
}

export default uploadOnCloudinary;