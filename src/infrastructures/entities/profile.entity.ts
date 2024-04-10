import { GenderEnum } from '@/application/common/enums/gender.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Skill } from './skill.entity';
import { Position } from './position.entity';
import { ProfileStatusEnum } from '@/application/common/enums/profile-status.enum';

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    fullName: string;

    @Column({ type: 'varchar', nullable: true })
    phoneNumber: string | null;

    @Column('varchar')
    email: string;

    @Column('varchar')
    dayOfBirth: Date;

    @Column('varchar')
    avatarUrl: string;

    @Column({
        type: 'enum',
        enum: GenderEnum,
        default: GenderEnum.OTHER
    })
    gender: GenderEnum;

    @Column({
        type: 'enum',
        enum: ProfileStatusEnum,
        default: ProfileStatusEnum.ACTIVE
    })
    status: ProfileStatusEnum;


    @OneToMany(() => Skill, skill => skill.profile)
    skills: Skill[];

    @OneToMany(() => Position, position => position.profile)
    positions: Position[];

    @Column('varchar')
    description: string
}