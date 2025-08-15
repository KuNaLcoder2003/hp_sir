"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOnCloud = uploadOnCloud;
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloud = cloudinary_1.default.v2;
cloud.config({
    cloud_name: 'doyifognr',
    api_key: '558719477873916',
    api_secret: 'v8ZvCjyKR-CgQwVd9D8qEpBygxw'
});
function uploadOnCloud(buffer, folder_name, type) {
    return new Promise((resolve, reject) => {
        const result = cloud.uploader.upload_stream({
            folder: folder_name,
            resource_type: type,
        }, (error, res) => {
            if (error)
                reject({ valid: false, error: error, url: "" });
            else
                resolve({ valid: true, url: (res === null || res === void 0 ? void 0 : res.secure_url) || "" });
        });
        result.end(buffer);
    });
}
