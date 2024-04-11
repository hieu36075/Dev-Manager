import { AVATARDEFAULT } from '@/application/common/constants/constants';
import { PositionM } from '@/domain/model/position.model';
import { ProfileM } from '@/domain/model/profile.model';
import { SkillM } from '@/domain/model/skill.model';
import { IProfileRepository } from '@/domain/repositories/profile.repository';
import { Profile } from '@/infrastructures/entities/profile.entity';
import { Skill } from '@/infrastructures/entities/skill.entity';
import { ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

export class ProfileRepositoryOrm implements IProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findAll(): Promise<ProfileM[]> {
    return await this.profileRepository.find({
      relations:{
        positions:true,
        skills:true
      }
    });
  }
  async findById(id: string): Promise<ProfileM> {
    if (!id) {
      throw new ForbiddenException({ message: 'Error Data' });
    }
    return await this.profileRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  async create(entity: Partial<ProfileM>,manager:EntityManager): Promise<ProfileM> {
    const profile = new Profile();
    profile.fullName = entity.fullName;
    profile.email = entity.email;
    profile.dayOfBirth = entity.dayOfBirth;
    profile.description = entity.description;
    profile.avatarUrl = entity.avatarUrl || AVATARDEFAULT;
    return await manager.save(profile);
  }
  update(id: string, entity: Partial<ProfileM>): Promise<ProfileM> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async addSkillsAndPositonToProfile(
    profileId: string,
    skills: SkillM[],
    position: PositionM[],
    manager: EntityManager
  ): Promise<void> {
    if (!profileId) {
      throw new Error('Profile not found');
    }
    const profile = new Profile()
    profile.id = profileId
    profile.skills = skills;
    profile.positions = position;
    await manager.save(profile);
  }
}
