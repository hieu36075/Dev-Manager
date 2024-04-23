// get-all-users-query.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ForbiddenException,
  Inject,
  NotAcceptableException,
} from '@nestjs/common';
// import { UpdateLanguageUserCommand } from './update-language.command';
import { InjectionToken } from '@/application/common/constants/constants';
import { ITechnicalMemberRepository } from '@/domain/repositories/technicalMember';
import { TechnicalRepositoryOrm } from '@/infrastructures/repositories/technical/technical.repository';
import { CreateTechnicalMemberCommand } from './create-technicalMember.command';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user/user.repository';

@QueryHandler(CreateTechnicalMemberCommand)
export class CreateTechnicalMemberHandler
  implements IQueryHandler<CreateTechnicalMemberCommand>
{
  constructor(
    private readonly technicalRepository: TechnicalRepositoryOrm,
    @Inject(InjectionToken.TECHNICALMEMBER_REPOSITORY)
    private readonly technicalMemberRepository: ITechnicalMemberRepository,
    private readonly userRepository : UserRepositoryOrm
  ) {}

  async execute(command: CreateTechnicalMemberCommand): Promise<any> {
    const { id } = command;
    try {
        const user = await this.userRepository.findById(command.userId)
      const currentLanguageMember =
        await this.technicalMemberRepository.findById(id);
      const technical = await this.technicalRepository.findById(
        command.technicalId,
      );
      if (!currentLanguageMember)
        throw new NotAcceptableException("Id don't valid");
      await this.technicalMemberRepository.create({
        user:user,
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
