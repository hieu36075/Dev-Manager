import { LanguageMemberRepositoryOrm } from './../../../../../infrastructures/repositories/languageMember/languageMember.repository';
import { LanguageRepositoryOrm } from './../../../../../infrastructures/repositories/language/language.repository';
import { ProjectMemberRepositoryOrm } from '@/infrastructures/repositories/projectMember/projectMember.repository';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user/user.repository';
import { Inject, MethodNotAllowedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAccountCommand } from './delete-account.command';
import { Connection } from 'typeorm';
import { InjectionToken } from '@/application/common/constants/constants';
import { ILanguageMemberRepository } from '@/domain/repositories/languageMember.repository';
import { IPositionMemberRepository } from '@/domain/repositories/positionMember.repository';
import { TechnicalRepositoryOrm } from '@/infrastructures/repositories/technical/technical.repository';
import { TechnicalMemberRepositoryOrm } from '@/infrastructures/repositories/technicalMember/technicalMember.repository';
import { ITechnicalMemberRepository } from '@/domain/repositories/technicalMember';

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler
  implements ICommandHandler<DeleteAccountCommand>
{
  constructor(
    private readonly userRepository: UserRepositoryOrm,
    private readonly projectMemberRepository: ProjectMemberRepositoryOrm,
    private readonly connection: Connection,
    @Inject(InjectionToken.LANGUAGEMEMBER_REPOSITORY)
    private readonly languageMemberRepository: ILanguageMemberRepository,
    @Inject(InjectionToken.POSITIONMEMBER_REPOSITORY)
    private readonly postionMemberRepository: IPositionMemberRepository,
    @Inject(InjectionToken.TECHNICALMEMBER_REPOSITORY)
    private readonly technicalMemberRepository: ITechnicalMemberRepository,
  ) {}
  async execute(command: DeleteAccountCommand): Promise<any> {
    return await this.connection.transaction(async (manager) => {
      const currentUser = await this.userRepository.findById(command.id);
      const checkUserInProject =
        await this.projectMemberRepository.findUserInProject(currentUser);
    //   console.log(currentUser);
      if (checkUserInProject.length > 0) {
        throw new MethodNotAllowedException({
          message: 'User is in  a project, please check again',
        });
      }
      for (const languageMember of currentUser.languageMember) {
        await this.languageMemberRepository.delete(languageMember.id, manager);
      }
      for (const technicalMember of currentUser.technicalMember) {
        await this.technicalMemberRepository.delete(
          technicalMember.id,
          manager,
        );
      }
      for (const positionMember of currentUser.positionMember) {
        await this.postionMemberRepository.delete(positionMember.id, manager);
      }
      await this.userRepository.delete(command.id, manager);
      return Promise.resolve();
    });
  }
}
