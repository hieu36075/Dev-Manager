import { CloudinaryService } from "@/infrastructures/service/cloudinary/cloudinary.service";
import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiTags } from "@nestjs/swagger";


@Controller('file')
@ApiTags('File')
export class FileController{
    constructor(
        private readonly cloudinaryService: CloudinaryService
    ){

    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))    
    uploadImage(@UploadedFile() file: Express.Multer.File){
        return this.cloudinaryService.uploadImage(file)
    }
}