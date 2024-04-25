import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateProfileCommand } from "./update-profile.command";
import { CreateAccountCommand } from "../createUser/create-account.command";
import { ProfileRepositoryOrm } from "@/infrastructures/repositories/profile/profile.repository";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { Connection } from "typeorm";
import { parseISO } from "date-fns";
import { LanguageRepositoryOrm } from "@/infrastructures/repositories/language/language.repository";
import { Inject, NotAcceptableException } from "@nestjs/common";
import { InjectionToken } from "@/application/common/constants/constants";
import { ILanguageRepository } from "@/domain/repositories/language.repository";
import { ILanguageMemberRepository } from "@/domain/repositories/languageMember.repository";
import { ITechnicalMemberRepository } from "@/domain/repositories/technicalMember";
import { TechnicalRepositoryOrm } from "@/infrastructures/repositories/technical/technical.repository";
import { PositionRepositoryOrm } from "@/infrastructures/repositories/position/position.repository";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";
import { PositionMemberRepositoryOrm } from "@/infrastructures/repositories/positionMember/positionMember.repository";
import { IPositionMemberRepository } from "@/domain/repositories/positionMember.repository";

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand>
{
  constructor(
    private readonly userRepository: UserRepositoryOrm,
    private readonly profileRepository: ProfileRepositoryOrm,
    private readonly positionRepository: PositionRepositoryOrm,
    @Inject(InjectionToken.POSITIONMEMBER_REPOSITORY)
    private readonly positionMemberRepository : IPositionMemberRepository,
    private readonly connection: Connection,
  ) {}
  async execute(command: UpdateProfileCommand): Promise<any> {
    const { id, dayOfBirth, positions } = command;
    return await this.connection.transaction(async (manager) => {
      const user = await this.userRepository.findById(id);
      const profile = await this.profileRepository.findById(user?.profile?.id);

      if (command.managerId || command.managerId) {
        await this.userRepository.update(
          id,
          {
            isManager: command.isManager,
            managerId: command.managerId,
          },
          manager,
        );
      }
      if (positions) {
        const currentPositionMember =
          await this.positionMemberRepository.findPositionMember(user);

        const idsToDelete = currentPositionMember
          .filter((item) => !positions.includes(item.postion.id))
          .map((item) => item.id);

        await this.positionMemberRepository.removeAll(idsToDelete, manager);

        for (const id of positions) {
          const checkLanguage = currentPositionMember.filter(
            (item) => item.postion.id === id,   
          );
          if (checkLanguage.length > 0) continue;
          const newPosition = await this.positionRepository.findById(id);
          if (!newPosition) throw new NotAcceptableException('Id invalid');
          await this.positionMemberRepository.create(
            {
              user: user,
              postion: newPosition,
            },
            manager,
          );
        }
      }
      await this.profileRepository.update(
        user.profile.id,
        {
          address: command.address,
          dayOfBirth: parseISO(dayOfBirth),
          fullName: command.fullName,
          avatarUrl: command.avatarUrl,
          description: command.description,
        },
        manager,
      );
    });
  }
}