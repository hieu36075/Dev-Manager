import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { TechnicalMember } from './technicalMember.entity';

@Entity('technical')
export class Technical {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @OneToMany(() => TechnicalMember, technicalMember => technicalMember.technical)
  technicalMember: TechnicalMember[];
}