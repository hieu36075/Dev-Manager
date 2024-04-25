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
    
    @Column({ type: 'boolean', default: false })
    isDelete: boolean;

    @OneToMany(() => LanguageMember, languageMember => languageMember.language)
    languageMember: LanguageMember[];

    @OneToMany(() => LanguageProject, languageProject => languageProject.language)
    languageProject: LanguageProject[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
public updated_at: Date;
  }