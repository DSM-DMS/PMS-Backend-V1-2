import { EntityRepository, Repository } from "typeorm";
import { ParentEntity } from "./parent.entity";

@EntityRepository(ParentEntity)
export class ParentRepository extends Repository<ParentEntity> {}
