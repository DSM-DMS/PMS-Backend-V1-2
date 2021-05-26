import { Injectable, NotFoundException } from "@nestjs/common";
import { ParentEntity } from "./entity/parent.entity";
import { ParentRepository } from "./entity/parent.repository";
import { ParentService } from "./interface";

@Injectable()
export class ParentServiceImpl implements ParentService {
  constructor(private parentRepository: ParentRepository) {}

  public async checkAdminUserEmail(email: string): Promise<boolean> {
    const parent: ParentEntity = await this.parentRepository
      .createQueryBuilder("parent")
      .where("parent.email = :email", { email })
      .getOne();
    if (!parent) {
      throw new NotFoundException("Not found user");
    }
    return parent.user_role === "ADMIN";
  }
}
