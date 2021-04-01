import "dotenv/config";
import { ConnectionOptions } from "typeorm";
import { Meal } from "./event/meal/entity/meal.entity";
import { Parent } from "./shared/parent/parent.entity";
import { MealList } from "./shared/dms/dms.meal.entity";

interface DBConnectionOptions {
  [env: string]: ConnectionOptions;
}

const connectionOptions: DBConnectionOptions = {
  development: {
    type: "mysql",
    host: process.env.DEVELOPMENT_DATABASE_HOST,
    port: +process.env.DEVELOPMENT_DATABASE_PORT,
    username: process.env.DEVELOPMENT_DATABASE_USER,
    password: process.env.DEVELOPMENT_DATABASE_PASSWORD,
    database: process.env.DEVELOPMENT_DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [Meal, Parent],
  },
  production: {
    type: "postgres",
    host: process.env.PRODUCTION_DATABASE_HOST,
    port: +process.env.PRODUCTION_DATABASE_PORT,
    username: process.env.PRODUCTION_DATABASE_USER,
    password: process.env.PRODUCTION_DATABASE_PASSWORD,
    database: process.env.PRODUCTION_DATABASE_NAME,
    synchronize: false,
    logging: true,
    entities: [Meal, Parent],
  },
  dms: {
    type: "mysql",
    host: process.env.DMS_DATABASE_HOST,
    port: +process.env.DMS_DATABASE_PORT,
    username: process.env.DMS_DATABASE_USER,
    password: process.env.DMS_DATABASE_PASSWORD,
    database: process.env.DMS_DATABASE_NAME,
    synchronize: false,
    logging: false,
    name: "dmsConnection",
    entities: [MealList],
  }
}

export { connectionOptions };