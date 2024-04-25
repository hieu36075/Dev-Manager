import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import {  IQuery } from "@nestjs/cqrs";

export class GetAllTechnicalQuery implements IQuery {
    constructor(
        public readonly pageOptionsDto: PageOptionsDto
    ) {}
}