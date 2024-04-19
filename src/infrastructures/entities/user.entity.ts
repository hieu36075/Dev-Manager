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
import { Role } from './role.entity';
import { ProjectMember } from './projectMember.entity';
import { Project } from './project.enity';
import { LanguageMember } from './languageMember.entity';
import { Profile } from './profile.entity';
import { TechnicalMember } from './technicalMember.entity';
import { PositionMember } from './positionMember.entity';
import { ProjectHistory } from './projectHistory.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { nullable: true })
  userName: string;
  
  @Column('varchar', { nullable: true })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => Role, role => role.users)
  role: Role;


  @OneToMany(() => ProjectMember, projectMember => projectMember.user)
  projectMembers: ProjectMember[];

  @OneToMany(() => LanguageMember, languageMember => languageMember.user)
  languageMember: LanguageMember[];


  @Column({ type: 'boolean', default: false })
  isManager: boolean;

  @Column({ type: 'boolean', default: false })
  isDelete: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager: User;

  @Column({ nullable: true })
  managerId: string;

  @OneToMany(() => Project, project => project.user)
  project: Project[]

  @OneToMany(() => TechnicalMember, technical => technical.user)
  technicalMember: TechnicalMember[];

  @OneToMany(() => PositionMember, positionMember => positionMember.user)
  positionMember: PositionMember[];

  @OneToMany(() => ProjectHistory, projectHistory => projectHistory.user)
  projectHistory: ProjectHistory[];

  @OneToOne(() => Profile )
  @JoinColumn()
  profile: Profile
}