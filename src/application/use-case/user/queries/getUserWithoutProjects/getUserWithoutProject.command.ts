import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import {  IQuery } from "@nestjs/cqrs";

export class GetUserWithoutProjectQuery implements IQuery {
    constructor(
    ) {}
}