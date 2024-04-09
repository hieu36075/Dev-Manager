
import { IUserRepository } from "@/domain/repositories/user.repository";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { UserM } from "@/domain/model/user.model";
import { CreateUserDTO } from "@/application/dto/user/create-user.dto";
import { RoleM } from "@/domain/model/role.model";

@Injectable()
export class UserRepositoryOrm implements IUserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){

    }

    async findAll(): Promise<UserM[]> {
        return await this.userRepository.find()
    }
    async findById(id: string): Promise<UserM> {
        if(!id){
            throw new ForbiddenException("error id")
        }
        const user = await this.userRepository.findOne({
            where:{
                id:id
            }
        })
        if(!User){
            throw new ForbiddenException("Error User")
        }
        return user

    }
    async createUser(createUserDTO : CreateUserDTO, role: RoleM): Promise<UserM>{
        const user = new User()
        user.email = createUserDTO.email;
        user.userName = createUserDTO.userName;
        user.password = createUserDTO.password;
        user.role = role
        return await this.userRepository.save(user)
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
}