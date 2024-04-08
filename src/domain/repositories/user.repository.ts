
import { CreateUserDTO } from "@/application/dto/user/create-user.dto";
import { UserM } from "../modal/user.modal";

export interface IUserRepository{
    createUser(createUserDto: CreateUserDTO): Promise<UserM>;
    getUserByEmail(email:string) : Promise<UserM>
}