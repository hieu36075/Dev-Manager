import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { ProjectMember } from './projectMember.entity';
import { ProjectStatusEnum } from '@/application/common/enums/project-status.enum';

  
  @Entity('project')
  export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Index({ unique: true })
    @Column('varchar', { unique: true })
    name: string;

    @Column('varchar')
    description :string;
    
    @CreateDateColumn({ name: 'start_date' })
    startDate: Date;
  
    @UpdateDateColumn({ name: 'end_date' })
    endDate: Date;

    // @OneToMany(() => ProjectMember, projectMember => projectMember.project)
    // projectMembers: ProjectMember[];
    
    @Column({
        type: 'enum',
        enum: ProjectStatusEnum,
        default: ProjectStatusEnum.InProgress
    })
    status: ProjectStatusEnum;

    @Column('varchar', { array: true })
    technical: string[];
  }