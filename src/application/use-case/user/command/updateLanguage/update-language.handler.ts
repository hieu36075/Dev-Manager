// get-all-users-query.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProfileRepositoryOrm } from '@/infrastructures/repositories/profile/profile.repository';
import {
  ForbiddenException,
  Inject,
  NotAcceptableException,
} from '@nestjs/common';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user/user.repository';
import { UpdateLanguageUserCommand } from './update-language.command';
import { InjectionToken } from '@/application/common/constants/constants';
import { ILanguageMemberRepository } from '@/domain/repositories/languageMember.repository';
import { ILanguageRepository } from '@/domain/repositories/language.repository';

@QueryHandler(UpdateLanguageUserCommand)
export class UpdateLanguageUserHandler
  implements IQueryHandler<UpdateLanguageUserCommand>
{
  constructor(
    private readonly userRepository: UserRepositoryOrm,
    @Inject(InjectionToken.LANGUAGE_REPOSITORY)
    private readonly languageRepository: ILanguageRepository,
    @Inject(InjectionToken.LANGUAGEMEMBER_REPOSITORY)
    private readonly languageMemberRepository: ILanguageMemberRepository,
  ) {}

  async execute(command: UpdateLanguageUserCommand): Promise<any> {
    const { id } = command;
    try {
      const currentLanguageMember =
        await this.languageMemberRepository.findById(id);
      const language = await this.languageRepository.findById(
        command.languageId,
      );
      if (!currentLanguageMember)
        throw new NotAcceptableException("Id don't valid");
      await this.languageMemberRepository.update(currentLanguageMember.id, {
        language: language,
        level: command.level,
        experience: command.experience,
      });
      return 
    } catch (error) {
      throw new ForbiddenException();
    }
    // return new GetAllUserResponse(users);
  }
}
