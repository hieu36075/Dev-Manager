import { AVATARDEFAULT } from '@/application/common/constants/constants';
import { PageMetaDto } from '@/application/dto/pagination/pageMeta.dto';
import { PageOptionsDto } from '@/application/dto/pagination/paginationOptions';
import { PageDto } from '@/application/dto/pagination/responsePagination';
import { PositionM } from '@/domain/model/position.model';
import { ProfileM } from '@/domain/model/profile.model';
import {TechnicalM } from '@/domain/model/technical.model';
import { IProfileRepository } from '@/domain/repositories/profile.repository';
import { Profile } from '@/infrastructures/entities/profile.entity';
import { ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseISO } from 'date-fns';
import { EntityManager, Like, Repository } from 'typeorm';

export class ProfileRepositoryOrm implements IProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findAllOptions(pageOptionsDto: PageOptionsDto): Promise<any>{
    // const { name, page, take } = pageOptionsDto;
    //   const takeData = take || 10;
    //   const skip = (page - 1) * take;
    //   const [result, total] = await this.profileRepository.findAndCount({
    //       where:{
    //           fullName: name? Like(`%${name}%`) : Like(`%%`)
    //       },
    //       relations:{
    //         positions:true,
    //         technicalMember:true,
    //         user:{
    //           manager:true
    //         }
    //       },
    //       select:{
    //         user:{
    //           isManager:true,
    //           managerId:true,
    //           userName:true,
    //           manager:{
    //             userName:true
    //           }
    //         }
    //       },
    //       skip,
    //       take:takeData
    //   });

    //   const pageMetaDto = new PageMetaDto(pageOptionsDto, total);
      return this.profileRepository.find()
      // return new PageDto<ProfileM>(result, pageMetaDto, "Success")

  }

  async findAll(id?: string):Promise<ProfileM[]>{
    return await this.profileRepository.find({
      where:{
        id:id
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
    // profile.user = entity.user
    return await manager.save(profile);
  }
  async update(id: string, entity: Partial<ProfileM>, manager?: EntityManager): Promise<ProfileM> {
    const profile = await this.findById(id);
    if (!profile) {
      throw new Error('Project not found');
    }
    
    for (const [key, value] of Object.entries(entity)) {
      if (value !== undefined && value !== null) {
          profile[key] = value;
        
      }
    }
    return await manager.save(profile)
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async addPositonToProfile(
    profileId: string,
    position: PositionM[],
    manager: EntityManager
  ): Promise<void> {
    if (!profileId) {
      throw new Error('Profile not found');
    }
    const profile = new Profile()
    profile.id = profileId
    // profile.positions = position;
    await manager.save(profile);
  }

  // async getEmployee(projectId:string) : Promise<ProfileM[]>{
  //   return await this.profileRepository.find({
  //     where:{
  //       user:{
  //         projectMembers:{
  //           project:{
  //             id: projectId
  //           }
  //         },
          
  //       },
        
  //     }
  //   })
  // }
}
