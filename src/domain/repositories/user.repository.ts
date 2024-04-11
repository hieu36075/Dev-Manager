
import { UserM } from "../model/user.model";
import { RoleM } from "../model/role.model";
import { GenericRepository } from "./generic-repository";

export interface IUserRepository extends GenericRepository<UserM>{
    getUserByEmail(email:string) : Promise<UserM>
    getEmployee(id:string) : Promise<UserM[]>
}