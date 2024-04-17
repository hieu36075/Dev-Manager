import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.enity';
import { Language } from './language.entity';
import { Position } from './position.entity';


@Entity('position_Member')
export class PositionMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Position, position => position.positions)
  postion: Position;

  @ManyToOne(() => User, user => user.positionMember)
  user: User;


}
