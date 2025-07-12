import { rejects } from "assert"
import cloudinary from "cloudinary"
import { error } from "console"

const cloud = cloudinary.v2
cloud.config({
    cloud_name : '',
    api_key : '',
    api_secret : ''
})

interface CloudinaryResponse{
    valid? : boolean
    error? : string
    url : string
}

export function uploadOnCloud(buffer : Buffer , folder_name : string , type : ("video" | "image" | "raw" | "auto")) : Promise<CloudinaryResponse>{
    return new Promise((resolve , reject)=> {
        const result = cloud.uploader.upload_stream({
            folder : folder_name,
            resource_type : type,
        },
        (error , res)=> {
            if(error) reject({valid : false , error : error , url : ""})
            else resolve( {valid : true , url : res?.secure_url || ""})
        }
        
    )
    result.end(buffer)
    })
}