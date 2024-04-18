import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.enity';
import { PositionEnum } from '@/application/common/enums/position.enum';
import { Position } from './position.entity';
import { RoleMemberProject } from './roleMemberProject.entity';

@Entity('project_members')
export class ProjectMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.projectMembers)
  project: Project;

  @ManyToOne(() => User, (user) => user.projectMembers)
  user: User;

  @CreateDateColumn({ name: 'start_date' })
  joinDate: Date;

  @CreateDateColumn({ name: 'fire_date' })
  fireDate: Date;

  @OneToMany(()=> RoleMemberProject, roleMemberProject => roleMemberProject.projectMember)
  roles: RoleMemberProject[];
}
