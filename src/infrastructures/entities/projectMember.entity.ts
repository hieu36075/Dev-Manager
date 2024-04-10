import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.enity';
import { User } from './user.entity';

@Entity('project_members')
export class ProjectMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.projectMembers)
  project: Project;

  @ManyToOne(() => User, (user) => user.projectMembers)
  user: User;
}
