import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import {  IQuery } from "@nestjs/cqrs";

export class GetAllUserOptionQuery implements IQuery {
    constructor(
        public readonly pageOptionsDto: PageOptionsDto
    ) {}
}