
import { CreateUserDTO } from "@/application/dto/user/create-user.dto";
import { UserM } from "../model/user.model";
import { RoleM } from "../model/role.model";

export interface IUserRepository{
    findAll():Promise<UserM[]>;
    createUser(createUserDto: CreateUserDTO, role : RoleM): Promise<UserM>;
    getUserByEmail(email:string) : Promise<UserM>
    findById(id: string): Promise<UserM | undefined>;
}