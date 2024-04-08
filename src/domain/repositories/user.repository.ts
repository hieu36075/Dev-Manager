import { CreateUserDto } from "../dto/create-user.dto";
import { UserM } from "../modal/user.modal";

export interface IUserRepository{
    createUser(createUserDto: CreateUserDto): Promise<UserM>;
}