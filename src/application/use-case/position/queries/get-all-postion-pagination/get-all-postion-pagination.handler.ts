import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { PositionRepositoryOrm } from "@/infrastructures/repositories/position/position.repository";
import { PositionM } from "@/domain/model/position.model";
import { GetAllPostionPaginationQuery } from "./get-all-postion-pagination.command";

@QueryHandler(GetAllPostionPaginationQuery)
export class GetAllPaginationPositionHandler implements IQueryHandler<GetAllPostionPaginationQuery>{
    constructor(
        private readonly positionRepository : PositionRepositoryOrm
    ){

    }
    async execute(query: GetAllPostionPaginationQuery): Promise<any> {
        const { pageOptionsDto } = query
        const postion = await this.positionRepository.findAllOptions(pageOptionsDto)
        return postion
    }
}