import { GenericRepository } from "./generic-repository";
import { ProfileM } from "../model/profile.model";
import { PageDto } from "@/application/dto/pagination/responsePagination";


export interface IProfileRepository extends GenericRepository<ProfileM>{
    getEmployee(id:string, managerId: string) : Promise<ProfileM[]>
}