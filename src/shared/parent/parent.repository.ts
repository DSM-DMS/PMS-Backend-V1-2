import { NotFoundException } from "@nestjs/common";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Parent } from "./parent.entity";

@EntityRepository(Parent)
export class ParentRepository extends Repository<Parent> {
  static getQueryRepository() {
    return getCustomRepository(ParentRepository);
  }

  public async findByEmail(email: string): Promise<Parent> {
    const parent: Parent = await this.createQueryBuilder("parent")
      .where("parent.email = :email", { email })
      .getOne();
    if (!parent) {
      throw new NotFoundException("Not found user");
    }
    return parent;
  }

  public async checkAdminUserEmail(email: string): Promise<boolean> {
    const parent: Parent = await this.findByEmail(email);
    return parent.user_role === "ADMIN" ? true : false;
  }
}
