// get-all-users-query.handler.ts
import {
  ForbiddenException,
  Inject
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { UpdateLanguageUserCommand } from './update-language.command';
import { InjectionToken } from '@/application/common/constants/constants';
import { ITechnicalMemberRepository } from '@/domain/repositories/technicalMember';
import { TechnicalRepositoryOrm } from '@/infrastructures/repositories/technical/technical.repository';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user/user.repository';
import { Connection } from 'typeorm';
import { CreateTechnicalMemberCommand } from './create-technicalMember.command';
@CommandHandler(CreateTechnicalMemberCommand)
export class CreateTechnicalMemberHandler
  implements ICommandHandler<CreateTechnicalMemberCommand>
{
  constructor(
    private readonly technicalRepository: TechnicalRepositoryOrm,
    @Inject(InjectionToken.TECHNICALMEMBER_REPOSITORY)
    private readonly technicalMemberRepository: ITechnicalMemberRepository,
    private readonly userRepository: UserRepositoryOrm,
    private readonly connection: Connection,
  ) {}

  async execute(command: CreateTechnicalMemberCommand): Promise<any> {

        return await this.connection.transaction(async (manager) => {

          try {
            const user = await this.userRepository.findById(command.userId);
            // const currentLanguageMember =
            //   await this.technicalMemberRepository.findById(id);
            const technical = await this.technicalRepository.findById(command.id);
            
             return await this.technicalMemberRepository.create({
              user: user,
              technical: technical,
              level: command.level,
              experience: command.experience,
            }, manager);
           
          } catch (error) {
            console.log(error);
            throw new ForbiddenException();
          }
    // return new GetAllUserResponse(users);
        })
  }
}
