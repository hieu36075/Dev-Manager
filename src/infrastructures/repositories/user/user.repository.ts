
import { IUserRepository } from "@/domain/repositories/user.repository";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { EntityManager, Repository } from "typeorm";
import { UserM } from "@/domain/model/user.model";
import { CreateUserDTO } from "@/application/dto/user/create-user.dto";
import { RoleM } from "@/domain/model/role.model";

@Injectable()
export class UserRepositoryOrm implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {

    }
    async findAll(): Promise<UserM[]> {
        return await this.userRepository.find()
    }
    async findById(id: string): Promise<UserM> {
        if (!id) {
            throw new ForbiddenException("error id")
        }
        const user = await this.userRepository.findOne({
            where: {
                id: id
            }
        })
        return user
    }
    async create(entity: Partial<UserM>, manager: EntityManager): Promise<UserM> {
        const user = new User()
        user.email = entity.email;
        user.userName = entity.userName;
        user.password = entity.password;
        user.role = entity.role
        // user.profile = entity.profile
        return await manager.save(user)

    }

    async update(id: string, entity: Partial<UserM>, manager?: EntityManager): Promise<UserM> {
        const user = await this.findById(id)
        user.isManager = entity.isManager || user.isManager
        user.managerId = entity.managerId 
        return await manager.save(user)
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getUserByEmail(email:string) : Promise<UserM>{

        const user = await this.userRepository.findOne({
            where:{
                email: email
            },
            relations:{
                role: true
            }
        })
        return user
    }

    async  getEmployee(id: string): Promise<UserM[]> {
        return await this.userRepository.find({
            where:{
                id: id
            }
        })
    }


}