
import { CreateUserDTO } from "@/application/dto/user/create-user.dto";
import { UserM } from "../modal/user.modal";
import { RoleM } from "../modal/role.modal";

export interface IUserRepository{
    findAll():Promise<UserM[]>;
    createUser(createUserDto: CreateUserDTO, role : RoleM): Promise<UserM>;
    getUserByEmail(email:string) : Promise<UserM>
}