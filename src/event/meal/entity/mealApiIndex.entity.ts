import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("meal_api_index")
export class MealApiIndex {
  @PrimaryColumn()
  id: number;
  
  @Column({ nullable: true })
  breakfast_api_index: number;

  @Column({ nullable: true })
  lunch_api_index: number;

  @Column({ nullable: true })
  dinner_api_index: number;
}