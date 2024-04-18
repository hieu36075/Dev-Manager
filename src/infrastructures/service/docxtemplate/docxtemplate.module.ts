// word.module.ts

import { InjectionToken } from '@/application/common/constants/constants';
import { Module } from '@nestjs/common';
import { DocxTemplateService } from './docxtemplate.service';

const adapter = [
  {
    provide: InjectionToken.DOCXTEMPLATE_REPOSITORY,
    useClass: DocxTemplateService
  }
]
@Module({
  providers: [
    ...adapter
  ],
  exports: [
    ...adapter
  ]
})
export class DocxtemplateModule { }
