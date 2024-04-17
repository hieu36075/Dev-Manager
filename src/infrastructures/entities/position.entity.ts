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
import { ProjectMember } from './projectMember.entity';
  
  @Entity('position')
  export class Position {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('varchar')
    name: string;

    @Column('varchar')
    description: string;
  
    @ManyToOne(()=>Profile,(profile) => profile.positions)
    profile: Profile

    @ManyToOne(()=>ProjectMember,(projectMember) => projectMember.roles)
    projectMember: ProjectMember
    
  }