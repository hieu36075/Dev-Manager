import { PositionMemberM } from "../model/positionMember.model";
import { GenericRepository } from "./generic-repository";

export interface IPositionMemberRepository extends GenericRepository<PositionMemberM>{
  findPositionMember(user: any,): Promise<PositionMemberM[]> 
  removeAll(position: any, manager?: any): Promise<any>
}