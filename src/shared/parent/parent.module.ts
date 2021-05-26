import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParentRepository } from "./entity/parent.repository";
import { ParentServiceImpl } from "./parent.service";

export const PARENT_SERVICE_TOKEN = "ParentService";

@Module({
  imports: [TypeOrmModule.forFeature([ParentRepository])],
  providers: [
    {
      provide: PARENT_SERVICE_TOKEN,
      useClass: ParentServiceImpl,
    },
  ],
  exports: [PARENT_SERVICE_TOKEN],
})
export class ParentModule {}
