import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import {  IQuery } from "@nestjs/cqrs";

export class GetAllUserQuery implements IQuery {
    constructor(
        public readonly isManager?: boolean 
    ) {}
}