import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.enity';
import { Language } from './language.entity';


@Entity('language_member')
export class LanguageMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Language, language => language.languageMember)
  language: Language;

  @ManyToOne(() => User, user => user.projectMembers)
  user: User;

  @Column('varchar')
  level: string;

  @Column('varchar')
  experience: string;
}
