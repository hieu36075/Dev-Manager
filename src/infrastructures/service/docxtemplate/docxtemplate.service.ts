// word.service.ts

import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import Docxtemplater from 'docxtemplater';
import { IDocxtemplateRepository } from '@/domain/adapter/docxtemplater.repository';
import PizZip from 'pizzip';
import { UserM } from '@/domain/model/user.model';
@Injectable()
export class DocxTemplateService implements IDocxtemplateRepository {
  async generateWord(data: UserM): Promise<string> {
    const templatePath = path.resolve(
      __dirname,
      '../../../../assets/template/template.docx',
    );
    // console.log(data)
    const docContent = fs.readFileSync(templatePath, 'binary');
    const doc = new Docxtemplater();
    var zip = new PizZip(docContent);
    doc.loadZip(zip);
    // const user = data.profile

    // console.log(data.projectMembers[0])
    doc.setData(data);

    try {
      doc.render();
    } catch (error) {
      throw new Error('Error rendering template: ' + error);
    }

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    return buf;
  }
}
