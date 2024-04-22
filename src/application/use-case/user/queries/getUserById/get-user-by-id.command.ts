import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import {  IQuery } from "@nestjs/cqrs";

export class GetUserByIdQuery implements IQuery {
    constructor(
        public readonly id: string 
    ) {}
}