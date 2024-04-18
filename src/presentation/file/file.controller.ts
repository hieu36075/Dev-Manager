import { GenerateCVQuery } from "@/application/use-case/file/query/generate-cv.command";
import { CloudinaryService } from "@/infrastructures/service/cloudinary/cloudinary.service";
import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiTags } from "@nestjs/swagger";


@Controller('file')
@ApiTags('File')
export class FileController{
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly queryBus: QueryBus
    ){

    }

    @Get('generate-cv')
    getCv(@Query('id') id:string): Promise<Buffer>{
        return this.queryBus.execute(new GenerateCVQuery(id))
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))    
    uploadImage(@UploadedFile() file: Express.Multer.File){
        return this.cloudinaryService.uploadImage(file)
    }


}