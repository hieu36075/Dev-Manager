import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllPostionQuery } from "./get-all-position.command";
import { PositionRepositoryOrm } from "@/infrastructures/repositories/position/position.repository";
import { PositionM } from "@/domain/model/position.model";

@QueryHandler(GetAllPostionQuery)
export class GetAllPositionHandler implements IQueryHandler<GetAllPostionQuery>{
    constructor(
        private readonly positionRepository : PositionRepositoryOrm
    ){

    }
    async execute(query: GetAllPostionQuery): Promise<any> {
        const { pageOptionsDto } = query
        const postion = await this.positionRepository.findAllOptions(pageOptionsDto)
        return postion
    }
}