import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("meal")
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15 })
  datetime: string;

  @Column()
  breakfast_img: string;

  @Column()
  lunch_img: string;

  @Column()
  dinner_img: string;

  @Column()
  breakfast_list: string;

  @Column()
  lunch_list: string;

  @Column()
  dinner_list: string;
}