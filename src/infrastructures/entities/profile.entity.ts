import { GenderEnum } from '@/application/common/enums/gender.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Technical } from './technical.entity';
import { Position } from './position.entity';
import { ProfileStatusEnum } from '@/application/common/enums/profile-status.enum';
import { User } from './user.entity';
import { Language } from './language.entity';
import { TechnicalMember } from './technicalMember.entity';

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


    // @OneToOne(() => User)
    // @JoinColumn()
    // user: User



    // @OneToMany(() => Position, position => position.profile)
    // positions: Position[];

    @Column('varchar')
    description: string
}