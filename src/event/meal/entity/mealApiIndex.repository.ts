import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { MealApiIndex } from "./mealApiIndex.entity";

@EntityRepository(MealApiIndex)
export class MealApiIndexRepository extends Repository<MealApiIndex> {
  static getQueryRepository() {
    return getCustomRepository(MealApiIndexRepository);
  }

  public async getOrMake(): Promise<MealApiIndex> {
    const indexes: MealApiIndex = await this.findOne();
    return indexes ? indexes : await this.manager.save(this.create({ id: 1 }));
  }

  public async setApiIndex(
    time: keyof MealApiIndex,
    index: number,
  ): Promise<void> {
    const indexes: MealApiIndex = await this.getOrMake();
    indexes[time] = index;
    await this.manager.save(indexes);
  }

  public async getApiIndex(time: keyof MealApiIndex): Promise<number> {
    const indexes: MealApiIndex = await this.getOrMake();
    return indexes[time] ? indexes[time] : 0;
  }
}
