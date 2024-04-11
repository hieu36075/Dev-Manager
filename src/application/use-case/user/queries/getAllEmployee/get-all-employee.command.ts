import {  IQuery } from "@nestjs/cqrs";

export class GetAllProfileEmployeeQuery implements IQuery {
    constructor(
        public readonly projectId: string,
        public readonly managerId: string
    ) {}
}