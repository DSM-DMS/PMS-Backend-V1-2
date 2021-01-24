import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("meal")
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15, unique: true })
  datetime: string;

  @Column({ default: "" })
  breakfast_img: string;

  @Column({ default: "" })
  lunch_img: string;

  @Column({ default: "" })
  dinner_img: string;

  @Column({ default: "" })
  breakfast_list: string;

  @Column({ default: "" })
  lunch_list: string;

  @Column({ default: "" })
  dinner_list: string;
}