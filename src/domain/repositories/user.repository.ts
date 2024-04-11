
import { UserM } from "../model/user.model";
import { RoleM } from "../model/role.model";

export interface IUserRepository{
    findAll():Promise<UserM[]>;
    createUser(createUserDto: Partial<UserM>, manager? : any): Promise<UserM>;
    getUserByEmail(email:string) : Promise<UserM>
    findById(id: string): Promise<UserM | undefined>;
}