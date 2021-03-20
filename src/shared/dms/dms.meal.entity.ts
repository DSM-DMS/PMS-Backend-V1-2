import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("meal")
export class MealList {
  @PrimaryColumn("date")
  date: Date;

  @PrimaryColumn("int")
  type: number;

  @Column({ type: "varchar", length: 300 })
  meal: string;
}