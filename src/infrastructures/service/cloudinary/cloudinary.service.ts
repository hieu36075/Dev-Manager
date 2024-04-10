import { ICoudinalyRepository } from "@/domain/adapter/cloudinary.repository";
import { Injectable } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import toStream = require('buffer-to-stream');
import { createReadStream } from 'fs';
@Injectable()
export class CloudinaryService implements ICoudinalyRepository {
    constructor() {

    }
    uploadImage(file: Express.Multer.File): Promise<{ url: string } | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = v2.uploader.upload_stream(
                (error, result) => {
                    if (error) return reject(error);
                    resolve({ url: result.url });
                    // return result.url
                },
            );


            toStream(file.buffer).pipe(uploadStream);

        });
    }
}