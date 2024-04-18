import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.enity';
import { Language } from './language.entity';
import { Position } from './position.entity';
import { ProjectMember } from './projectMember.entity';


@Entity('role_member_project')
export class RoleMemberProject {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Position, position => position.positions)
    position: Position;

    @ManyToOne(() => ProjectMember, projectMember => projectMember.roles)
    projectMember: ProjectMember;

}
