import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user/user.repository';
import { ForbiddenException, Inject } from '@nestjs/common';
import { RoleRepositoryOrm } from '@/infrastructures/repositories/role/role.repository';
import { Role } from '@/application/common/enums/role.enum';
import { ProfileRepositoryOrm } from '@/infrastructures/repositories/profile/profile.repository';
import { parseISO } from 'date-fns';
import { TechnicalRepositoryOrm } from '@/infrastructures/repositories/technical/technical.repository';
import { PositionM } from '@/domain/model/position.model';
import { PositionRepositoryOrm } from '@/infrastructures/repositories/position/position.repository';
import { Connection } from 'typeorm';
import { ProfileM } from '@/domain/model/profile.model';
import { TechnicalMemberRepositoryOrm } from '@/infrastructures/repositories/technicalMember/technicalMember.repository';
import { LanguageRepositoryOrm } from '@/infrastructures/repositories/language/language.repository';
import { LanguageMemberRepositoryOrm } from '@/infrastructures/repositories/languageMember/languageMember.repository';
import { ILanguageMemberRepository } from '@/domain/repositories/languageMember.repository';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(
    private readonly userRepository: UserRepositoryOrm,
    private readonly roleRepository: RoleRepositoryOrm,
    private readonly profileRepository: ProfileRepositoryOrm,
    private readonly technicalRepository: TechnicalRepositoryOrm,
    private readonly positionRepository: PositionRepositoryOrm,
    private readonly connection: Connection,
    private readonly technicalMemberRepository: TechnicalMemberRepositoryOrm,
    private readonly languageRepository : LanguageRepositoryOrm,
    @Inject('ILanguageMemberRepository')
    private readonly languageMemberRepository : ILanguageMemberRepository
  ) {}

  async execute(command: CreateAccountCommand): Promise<ProfileM> {
    const {
      // password,
      // userName,
      email,
      fullName,
      dayOfBirth,
      description,
      technical,
      positions,
      language,
      isManager
    } = command;
    return await this.connection.transaction(async (manager) => {
      try {
        // const hashedPassword = await this.bcryptService.hash(password);
        const role = await this.roleRepository.findByName(Role.EMPLOYEE);



        const profile = await this.profileRepository.create(
          {
            fullName,
            dayOfBirth: parseISO(dayOfBirth),
            description: description,
            email: email,
   
          },
          manager,
        );


        const newUser = await this.userRepository.create(
          {
            email: email,
            role: role,
            profile: profile,
            isManager: isManager
          },
          manager,
        );
        if (technical && technical.length > 0) {
          // let technicalMember: TechnicalMemberM[] = []
          for (const id of technical) {
            const currentTechnical = await this.technicalRepository.findById(id);
            if (!currentTechnical) {
              throw new ForbiddenException({ message: 'invalid technical' });
            }
            await this.technicalMemberRepository.create({
              technical: currentTechnical,
              user:newUser
            },manager)
          }
        }

        if (language && language.length > 0) {
          for (const id of language) {
            const currentLanguage = await this.languageRepository.findById(id);
            if (!currentLanguage) {
              throw new ForbiddenException({ message: 'invalid language' });
            }
            await this.languageMemberRepository.create({
                language: currentLanguage,
                user: newUser
            },manager)
          }
        }
        
        let listPositioin: PositionM[] = [];
        if (positions && positions.length > 0) {
          for (const id of positions) {
            const currentPosition = await this.positionRepository.findById(id);
            if (!currentPosition) {
              throw new ForbiddenException({ message: 'invalid position' });
            }
            listPositioin.push(currentPosition);
          }
        }
        
        await this.profileRepository.addPositonToProfile(
          profile.id,
          listPositioin,
          manager,
        );
        return profile;
      } catch (error) {
    
        throw new ForbiddenException({ message: error });
      }
    });
  }
}
