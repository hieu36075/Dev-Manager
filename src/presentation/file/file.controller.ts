import { GenerateCVQuery } from '@/application/use-case/file/query/generate-cv.command';
import { CloudinaryService } from '@/infrastructures/service/cloudinary/cloudinary.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Readable } from 'stream';

@Controller('file')
@ApiTags('File')
export class FileController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('generate-cv')
  async getCv(@Query('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const buffer: Buffer = await this.queryBus.execute(
        new GenerateCVQuery(id),
      );
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=cv.docx');
      stream.pipe(res);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadImage(file);
  }
}
