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
import { LanguageMember } from './languageMember.entity';
import { LanguageProject } from './languageProject.entity';
  
  @Entity('language')
  export class Language {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('varchar')
    name: string;
    

    @OneToMany(() => LanguageMember, languageMember => languageMember.language)
    languageMember: LanguageMember[];

    @OneToMany(() => LanguageProject, languageProject => languageProject.language)
    languageProject: LanguageProject[];
  }