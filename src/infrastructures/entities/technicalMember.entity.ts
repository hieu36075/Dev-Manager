import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.enity';
import { Language } from './language.entity';
import { Technical } from './technical.entity';
import { Profile } from './profile.entity';
import { profile } from 'console';


@Entity('technical_member')
export class TechnicalMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Technical, technical => technical.technicalMember)
  technical: Technical;

  @ManyToOne(() => User, user => user.technicalMember)
  user: User;

  @Column('varchar')
  level: string;

  @Column('varchar')
  experience: string;

}
