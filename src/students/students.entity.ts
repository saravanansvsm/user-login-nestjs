import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  email: string;

  @Column()
  phone: number;
}
