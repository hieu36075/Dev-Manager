import { PositionM } from "./position.model";
import { UserM } from "./user.model";

export class PositionMemberM {
  id: string;
//   @ManyToOne(() => Position, position => position.positions)
  postion: PositionM;

//   @ManyToOne(() => User, user => user.positionMember)
  user: UserM;


}
