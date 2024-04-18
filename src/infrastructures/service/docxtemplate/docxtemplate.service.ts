// word.service.ts

import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import Docxtemplater from 'docxtemplater';
import { IDocxtemplateRepository } from '@/domain/adapter/docxtemplater.repository';

@Injectable()
export class DocxTemplateService implements IDocxtemplateRepository {
  async generateWord(data: any): Promise<string> {
    const templatePath = path.resolve(__dirname, '../../../../assets/template/test.docx');
    console.log(templatePath)
    console.log(templatePath)
    const docContent = fs.readFileSync(templatePath, 'binary');
    const doc = new Docxtemplater();
    doc.loadZip(docContent);

    doc.setData(data);

    try {
      doc.render();
    } catch (error) {
      throw new Error('Error rendering template: ' + error);
    }

    const buf = doc.getZip().generate({ type: 'nodebuffer' });


    const outputPath = path.resolve(__dirname, 'path/to/output.docx');
    // fs.writeFileSync(outputPath, buf);

    return outputPath;
  }
}
