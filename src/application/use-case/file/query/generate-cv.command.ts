
import { IQuery } from "@nestjs/cqrs";

export class GenerateCVQuery implements IQuery {
    constructor(
        
        public readonly id: string
    ) {
 
    }
}