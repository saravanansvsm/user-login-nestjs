/* eslint-disable prettier/prettier */
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Productlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  productlist: string;

  @Column({ type: 'varchar', length: 120 })
  brand: string;
  modal: any;
}