import { Parent } from "./entity/parent.entity.interface";

export interface ParentService {
  checkAdminUserEmail(email: string): Promise<boolean>;
  checkAdminUser(user: Parent): boolean;
  findUser(email: string): Promise<Parent>;
}
