
import { IUserRepository } from "@/domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { UserM } from "@/domain/modal/user.modal";
import { CreateUserDTO } from "@/application/dto/user/create-user.dto";
import { RoleM } from "@/domain/modal/role.modal";

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