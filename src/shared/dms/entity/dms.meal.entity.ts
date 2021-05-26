import { Column, Entity, PrimaryColumn } from "typeorm";
import { MealList } from "../interface";

@Entity("meal")
export class MealListEntity implements MealList {
  @PrimaryColumn("date")
  date: Date;

  @PrimaryColumn("int")
  type: number;

  @Column({ type: "varchar", length: 300 })
  meal: string;
}
