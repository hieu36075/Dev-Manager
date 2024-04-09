import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Profile } from './profile.entity';
  
  @Entity('position')
  export class Position {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('varchar')
    name: string;

    @Column('varchar')
    description: string;
  
    @ManyToOne(()=>Profile,(profile) => profile.postions)
    profile: Profile
  }