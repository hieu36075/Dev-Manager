import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.enity';
import { Language } from './language.entity';


@Entity('language_project')
export class LanguageProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Language, language => language.languageProject)
  language: Language;

  @ManyToOne(() => Project, project => project.projectMembers)
  project: Project;
}
