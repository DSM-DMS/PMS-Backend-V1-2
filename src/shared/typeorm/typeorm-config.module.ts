import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { connectionOptions } from "./ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions[process.env.NODE_ENV]),
    TypeOrmModule.forRoot(connectionOptions["dms"]),
    //TypeOrmModule.forRoot(connectionOptions["ddyzd"]),
  ],
})
export class TypeOrmConfigModule {}
