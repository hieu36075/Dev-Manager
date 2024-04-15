import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user/user.repository';
import { UserM } from '@/domain/model/user.model';
import { IJwtServicePayload } from '@/domain/adapter/token-service.repository';
import { JwtTokenService } from '@/infrastructures/service/jwt/jwt.service';
import { BcryptService } from '@/infrastructures/service/bcrypt/bcrypt.service';
import { ForbiddenException, UseInterceptors } from '@nestjs/common';
import { RoleRepositoryOrm } from '@/infrastructures/repositories/role/role.repository';
import { Role } from '@/application/common/enums/role.enum';
import { ProfileRepositoryOrm } from '@/infrastructures/repositories/profile/profile.repository';
import { parseISO } from 'date-fns';
import { TechnicalRepositoryOrm } from '@/infrastructures/repositories/technical/technical.repository';
import { TechnicalM } from '@/domain/model/technical.model';
import { PositionM } from '@/domain/model/position.model';
import { PositionRepositoryOrm } from '@/infrastructures/repositories/position/position.repository';
import { Connection } from 'typeorm';
import { ProfileM } from '@/domain/model/profile.model';
import { TechnicalMemberRepositoryOrm } from '@/infrastructures/repositories/technicalMember/technicalMember.repository';
import { TechnicalMemberM } from '@/domain/model/technicalMember.model';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(
    private readonly userRepository: UserRepositoryOrm,
    private readonly jwtService: JwtTokenService,
    private readonly roleRepository: RoleRepositoryOrm,
    private readonly bcryptService: BcryptService,
    private readonly profileRepository: ProfileRepositoryOrm,
    private readonly technicalRepository: TechnicalRepositoryOrm,
    private readonly positionRepository: PositionRepositoryOrm,
    private readonly connection: Connection,
    private readonly technicalMemberRepository: TechnicalMemberRepositoryOrm
  ) {}

  async execute(command: CreateAccountCommand): Promise<ProfileM> {
    const {
      password,
      userName,
      email,
      fullName,
      dayOfBirth,
      description,
      technical,
      positions,
    } = command;
    return await this.connection.transaction(async (manager) => {
      try {
        const hashedPassword = await this.bcryptService.hash(password);
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
            userName: userName,
            password: hashedPassword,
            role: role,
            profile: profile
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
            // technicalMember.push(newMember)
            // await this.skillRepository.update(currentTechnical.id, {technicalMember:technicalMember},manager)
            // await this.skillRepository.update
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
