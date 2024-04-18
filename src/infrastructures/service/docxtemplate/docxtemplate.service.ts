// word.service.ts

import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import Docxtemplater from 'docxtemplater';
import { IDocxtemplateRepository } from '@/domain/adapter/docxtemplater.repository';
import PizZip from "pizzip";
import { UserM } from '@/domain/model/user.model';
@Injectable()
export class DocxTemplateService implements IDocxtemplateRepository {
  async generateWord(data: UserM): Promise<string> {
    const templatePath = path.resolve(__dirname, '../../../../assets/template/template.docx');
    const docContent = fs.readFileSync(templatePath, 'binary');
    const doc = new Docxtemplater();
    var zip = new PizZip(docContent);
    doc.loadZip(zip);
    // const user = data.profile
    

    console.log(data)
    const projects = [
      {
        projectName: "CV Management",
        role: "Full Stack Developer and DevOps",
        description: "The project involves the development of an HR Management System tailored for a specific company. The system aims to streamline and automate various human resource processes, enhancing efficiency and accuracy in managing employee information, payroll, attendance, leave, and other HR-related tasks",
        specification: "Full-stack features development and maintenance",
        languagesAndFrameworks: "Nodejs, NestJs, Typescript, ReactJS",
        technologies: "Git/Github, Docker, PostgreSQL, AWS"
      },
      {
        projectName: "High Out Office",
        role: "BE",
        description: "Web-based application supporting Excel-like functionalities for input/output data, insight reports, data visualization in charts, report export…",
        specification: "BE features development and maintenance",
        languagesAndFrameworks: "Nodejs, NestJs, Typescript, ReactJS",
        technologies: "Git/Github, Docker, SQL Server, Serverless, AWS S3, AWS CloudWatch"
      }
    ];
    console.log(projects)
    doc.setData(data);
    

    try {
      doc.render();
    } catch (error) {
      throw new Error('Error rendering template: ' + error);
    }

    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    console.log(buf)

    const outputPath = path.resolve(__dirname, 'path/to/output.docx');
    // fs.writeFileSync(outputPath, buf);

    return buf;
  }
}
