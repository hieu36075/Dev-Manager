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
import { SkillRepositoryOrm } from '@/infrastructures/repositories/skill/skill.repository';
import { SkillM } from '@/domain/model/skill.model';
import { PositionM } from '@/domain/model/position.model';
import { PositionRepositoryOrm } from '@/infrastructures/repositories/position/position.repository';
import { Connection } from 'typeorm';
import { TransactionInterceptor } from '@/application/common/types/transaction.interceptor';
import { ProfileM } from '@/domain/model/profile.model';

@UseInterceptors(TransactionInterceptor)
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
    private readonly skillRepository: SkillRepositoryOrm,
    private readonly positionRepository: PositionRepositoryOrm,
    private readonly connection: Connection,
  ) {}

  async execute(command: CreateAccountCommand): Promise<ProfileM> {
    const {
      password,
      userName,
      email,
      fullName,
      dayOfBirth,
      description,
      skills,
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
        const newUser = await this.userRepository.createUser(
          {
            email: email,
            userName: userName,
            password: hashedPassword,
            role: role,
            profile: profile,
          },
          manager,
        );
        let listSkill: SkillM[] = [];
        if (skills && skills.length > 0) {
          for (const id of skills) {
            const currentSkill = await this.skillRepository.findById(id);
            if (!currentSkill) {
              throw new ForbiddenException({ message: 'invalid skill' });
            }
            listSkill.push(currentSkill);
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
  
        await this.profileRepository.addSkillsAndPositonToProfile(
          profile.id,
          listSkill,
          listPositioin,
          manager,
        );
        return profile; 
      } catch (error) {
        console.log(error)
        throw new ForbiddenException({message: error.driverError.detail});
      }
    });
  }
}
