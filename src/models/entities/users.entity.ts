import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', name: 'first_name', length: 225, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name', length: 225, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', name: 'email', length: 225, nullable: false })
  email: string;

  @Column({ type: 'varchar', name: 'password', length: 225, nullable: false })
  password: string;

  @Column({
    type: 'varchar',
    name: 'token',
    length: 225,
    nullable: true,
    default: null,
  })
  token: string;

  @Column({
    type: 'varchar',
    name: 'refresh_token',
    length: 225,
    nullable: true,
    default: null,
  })
  refreshToken: string;

  @CreateDateColumn({ name: 'created_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
