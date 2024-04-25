import { CreateLanguageMemberDTO } from '@/application/dto/languageMember/createLanguageMember.dto';
import { UpdateLanguageMemberDTO } from '@/application/dto/languageMember/updateLanguageMember.dto';
import { CreateLanguageMemberCommand } from '@/application/use-case/languageMember/command/create-languageMember/create-languageMember.command';
import { DeleteLanguageMemberCommand } from '@/application/use-case/languageMember/command/delete-languageMember/delete-languageMember.command';
import { LanguageMember } from '@/infrastructures/entities/languageMember.entity';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { UpdateLanguageMemberCommand } from './../../application/use-case/languageMember/command/update-languageMember/update-languageMember.command';

@Controller('languageMember')
@ApiTags('LanguageMember')
export class LanguageMemberController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(
    @Body() createLanguageMemberDTO: CreateLanguageMemberDTO,
  ): Promise<LanguageMember> {
    return this.commandBus.execute(
      plainToClass(CreateLanguageMemberCommand, createLanguageMemberDTO),
    );
  }

  @ApiProperty()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageMemberDTO: UpdateLanguageMemberDTO,
  ): Promise<LanguageMember | undefined> {
    return this.commandBus.execute(
      new UpdateLanguageMemberCommand(
        id,
        updateLanguageMemberDTO.userId,
        updateLanguageMemberDTO.level,
        updateLanguageMemberDTO.experience,
        updateLanguageMemberDTO.languageid,
      ),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.commandBus.execute(new DeleteLanguageMemberCommand(id));
  }
}
