import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.enity';
import { Language } from './language.entity';
import { Position } from './position.entity';

@Entity('project_History')
export class ProjectHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.projectHistory)
  project: Project;

  @ManyToOne(() => User, (user) => user.positionMember)
  user: User;

  @Column({ type: 'varchar', nullable: true })
  type: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @CreateDateColumn({ name: 'update_date' })
  updateDate: Date;
}
