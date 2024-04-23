import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import {  IQuery } from "@nestjs/cqrs";

export class UpdateLanguageUserCommand implements IQuery {
    constructor(
        public readonly id: string,
        public readonly level: string ,
        public readonly experience: string ,
        public readonly languageId: string  
    ) {}
}