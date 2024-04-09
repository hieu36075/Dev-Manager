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
import { Profile } from './profile.entity';
import { ProjectMember } from './projectMember.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  userName: string;

  @Column('varchar')
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => Role, role => role.users)
  role: Role;


  @OneToMany(() => ProjectMember, projectMember => projectMember.user)
  projectMembers: ProjectMember[];

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile
}