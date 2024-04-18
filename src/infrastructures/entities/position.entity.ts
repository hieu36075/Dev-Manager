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
import { RoleMemberProject } from './roleMemberProject.entity';
  
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
    
    @ManyToOne(()=> RoleMemberProject, position => position.position)
    positions: Position[];
  }