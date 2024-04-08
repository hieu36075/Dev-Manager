import { CreateUserDto } from "@/domain/dto/create-user.dto";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserM } from "@/domain/modal/user.modal";

@Injectable()
export class UserRepositoryOrm implements IUserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){

    }
    async createUser(createUserDTO : CreateUserDto): Promise<UserM>{
        const user = new User()
        user.email = createUserDTO.email;
        user.name = createUserDTO.name;
        user.password = createUserDTO.password;
        return await this.userRepository.save(user)
    }
}