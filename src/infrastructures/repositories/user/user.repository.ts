
import { IUserRepository } from "@/domain/repositories/user.repository";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { EntityManager, Like, Repository } from "typeorm";
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
    async findAll(pageOptionsDto?: PageOptionsDto): Promise<any> {
        const { name, page, take } = pageOptionsDto;
        const takeData = take || 10;
        const skip = (page - 1) * take;
        try {

            const [result, total] = await this.userRepository.findAndCount({
                where: {
                    profile: {
                        fullName: name ? Like(`%${name}%`) : Like(`%%`)
                    }
                },
                skip,
                take,
                relations: {
                    manager:{
                        profile:true
                    },
                    technicalMember: true,
                    profile: {
                        positions: true,
                    },

                },
                select: {
                    id:true,
                    email:true,
                    isManager:true,
                    managerId:true,
                    manager:{
                        userName:true,
                        profile:{
                            fullName:true,
                            avatarUrl:true
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
                    isManager: isManager
                },
                relations: {
                    technicalMember: true,
                    profile: {
                        positions: true,
                    },
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
                    profile: true
                },
                select: [
                    'id',
                    'email',
                    'userName',
                    'isManager',
                    'managerId',
                    'profile',
                ]
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
        return await manager.save(user)

    }

    async update(id: string, entity: Partial<UserM>, manager: EntityManager): Promise<UserM> {
        const user = await this.findById(id)
        user.isManager = entity.isManager || user.isManager
        user.managerId = entity.managerId
        return await manager.save(user)
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
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