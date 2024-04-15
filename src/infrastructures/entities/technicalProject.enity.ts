import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.enity';
import { Language } from './language.entity';
import { Technical } from './technical.entity';


@Entity('technical_project')
export class TechnicalProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Technical, technical => technical.technicalProject)
  technical: Technical;

  @ManyToOne(() => Project, project => project.technicalProject)
  project: Project;

  @Column('varchar')
  level: string;

  @Column('varchar')
  experience: string;


}
