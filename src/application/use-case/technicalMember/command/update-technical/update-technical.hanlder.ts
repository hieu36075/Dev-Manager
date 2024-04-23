// get-all-users-query.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ForbiddenException,
  Inject,
  NotAcceptableException,
} from '@nestjs/common';
// import { UpdateLanguageUserCommand } from './update-language.command';
import { InjectionToken } from '@/application/common/constants/constants';
import { UpdateTechnicalMemberCommand } from './update-technical.command';
import { ITechnicalMemberRepository } from '@/domain/repositories/technicalMember';
import { TechnicalRepositoryOrm } from '@/infrastructures/repositories/technical/technical.repository';

@QueryHandler(UpdateTechnicalMemberCommand)
export class UpdateTechnicalMemberHandler
  implements IQueryHandler<UpdateTechnicalMemberCommand>
{
  constructor(
    private readonly technicalRepository: TechnicalRepositoryOrm,
    @Inject(InjectionToken.TECHNICALMEMBER_REPOSITORY)
    private readonly technicalMemberRepository: ITechnicalMemberRepository,
  ) {}

  async execute(command: UpdateTechnicalMemberCommand): Promise<any> {
    const { id } = command;
    try {
      const currentLanguageMember =
        await this.technicalMemberRepository.findById(id);
      const technical = await this.technicalRepository.findById(
        command.technicalId,
      );
      if (!currentLanguageMember)
        throw new NotAcceptableException("Id don't valid");
      await this.technicalMemberRepository.update(currentLanguageMember.id, {
        technical: technical,
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
