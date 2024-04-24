
import { IUserRepository } from "@/domain/repositories/user.repository";
import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { EntityManager, ILike, Like, Repository } from "typeorm";
import { UserM } from "@/domain/model/user.model";
import { CreateUserDTO } from "@/application/dto/user/create-user.dto";
import { RoleM } from "@/domain/model/role.model";
import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import { PageDto } from "@/application/dto/pagination/responsePagination";
import { PageMetaDto } from "@/application/dto/pagination/pageMeta.dto";
import e from "express";

@Injectable()
export class UserRepositoryOrm implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {

    }
    // async getUserInProject(id: string, projectId: string): Promise<UserM> {
    //     const user = await this.userRepository.findOne({
    //         where:{
    //             id: id,
    //             project:{
    //                 id: projectId
    //             }
    //         }
    //     })
    //     return
    // }
    async findAll(pageOptionsDto?: PageOptionsDto): Promise<any> {
        const { name, page, take } = pageOptionsDto;
        const takeData = take || 10;
        const skip = (page - 1) * take;
        try {

            const [result, total] = await this.userRepository.findAndCount({
                where: {
                    profile: {
                        fullName: name ? ILike(`%${name}%`) : Like(`%%`),
                    
                    },
                    isDelete:false
                },
                skip,
                take,
                relations: {
                    manager:{
                        profile:true
                    },
                    profile: {
                        // positions: true,
                    },
                    technicalMember: {
                        technical:true
                    },
                    languageMember:{
                        language:true
                    },
                    positionMember:{
                        postion:true
                    }

                },
                select: {
                    id:true,
                    email:true,
                    isManager:true,
                    managerId:true,
                    manager:{
                        id:true,
                        profile:{
                            fullName:true,
                            avatarUrl:true
                        }
                    },
                    technicalMember:{
                        id:true,
                        technical:{
                            name:true
                        }
                    },
                    languageMember:{
                        id:true,
                        language:{
                            id:true,
                            name:true
                        }
                    },
                    positionMember:{
                        id:true,
                        postion:{
                            id:true,
                            name:true
                        }
                    }
                }
            });

            const pageMetaDto = new PageMetaDto(pageOptionsDto, total);
            return new PageDto<UserM>(result, pageMetaDto, "Success")
        } catch (error) {
            console.log(error)
        }
    }

    async findByIsManager(isManager?: boolean): Promise<any> {

        try {

            const result = await this.userRepository.find({
                where: {
                    isManager: isManager,
                    isDelete:false
                },
                relations: {
                    technicalMember: true,
                    profile: {
                        // positions: true,
                    },
                    languageMember:true
                },
                select: [
                    'id',
                    'email',
                    'userName',
                    'isManager',
                    'managerId',
                    'profile',

                ]

                // }
            });


            return result
        } catch (error) {
            console.log(error)
        }
    }
    async findById(id: string): Promise<UserM> {
        if (!id) {
            throw new ForbiddenException("error id")
        }
        try{

            const user = await this.userRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    profile: {
                        
                    },
                    technicalMember:{
                        technical:true
                    },
                    positionMember:{
                        postion:true
                    },
                    languageMember:{
                        language:true
                    },
                    projectMembers:{
                        roles:{
                            position:true
                        },
                        project:{
                            languageProject:{
                                language:true
                            },
                            technicalProject:{
                                technical:true
                            }
                        }
                    },
                    projectHistory:true

                    
                    
                },
                select:{
                    id:true,
                    email:true,
                    userName:true,
                    isManager:true,
                    created_at:true,
                    managerId:true,
                    profile:{
                        id:true,
                        fullName:true,
                        description:true,
                        dayOfBirth:true,
                        phoneNumber:true,
                        avatarUrl:true,
                        address:true,
                    },
                    technicalMember:{
                        id:true,
                        level:true, 
                        experience:true,
                        technical:{
                            id:true,
                            name:true
                        }
                    },
                    projectMembers:{
                        id:true,
                        roles:{
                          id:true,
                            position:{
                                id:true,
                                name:true
                            }
                        },
                        project:{
                            name:true,
                            languageProject:true,
                            startDate:true,
                            endDate:true,
                            description:true
                        }
                    },
                    languageMember:{
                        id:true,
                        level:true,
                        experience:true,
                        language:{
                            id:true,
                            name:true
                        }
                    }
                }
                //  [
                //     'id',
                //     'email',
                //     'userName',
                //     'isManager',
                //     'managerId',
                //     'profile',
                // ]
            })
            return user
        }catch(error){
            console.log(error)
        }
    }
    async create(entity: Partial<UserM>, manager: EntityManager): Promise<UserM> {
        const user = new User()
        user.email = entity.email;
        user.userName = entity.userName;
        user.password = entity.password;
        user.role = entity.role
        user.profile = entity.profile
        user.isManager = entity.isManager
        user.managerId = entity.managerId || null
        return await manager.save(user)

    }

    async update(id: string, entity: Partial<UserM>, manager: EntityManager): Promise<UserM> {
        const user = await this.findById(id)
        user.isManager = entity?.isManager ? entity.isManager :  user.isManager
        user.managerId = entity?.managerId ? entity.managerId :user.managerId
        return await manager.save(user)
    }
    async delete(id: string, manager?: EntityManager): Promise<void> {
        if(!id){
            throw new BadRequestException({message: "Don't have Id"})
        }
        const user = await this.findById(id)

        user.isDelete = true
        user.managerId = null,
        
        await manager.save(user)
        return Promise.resolve()
    }

    async getUserByEmail(email: string): Promise<UserM> {

        const user = await this.userRepository.findOne({
            where: {
                email: email
            },
            relations: {
                role: true
            }
        })
        return user
    }

    async getEmployee(projectId: string): Promise<UserM[]> {
        return await this.userRepository.find({
            where: {
                projectMembers: {
                    project: {
                        id: projectId
                    }
                }
            },
            relations:{
                manager:{
                    profile:true
                }
            },
            select:{
                isManager:true,
                managerId:true,
                manager:{
                    id:true,
                    profile:{
                        fullName:true
                    }
                }
            }
        })
    }


}