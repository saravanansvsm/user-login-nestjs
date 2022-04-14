/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Environment } from '../../common/contants/env-setup';
import { ConnectionOptions } from "typeorm";
require('dotenv').config()

class DatabaseConnection{
  getDatabaseConnection(){
    return {
      type: 'postgres',
      host: process.env[`${process.env.Development}_POSTGRES_HOST`],
      port: parseInt(process.env[`${process.env.Development}_POSTGRES_PORT`]) || 5432,
      database: process.env[`${process.env.Development}_POSTGRES_DATABASE`],
      username: process.env[`${process.env.Development}_POSTGRES_USER`],
      password: process.env[`${process.env.Development}_POSTGRES_PASSWORD`],
      entities: ["dist/**/*.entity{ .ts,.js}"],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      cli:{
        migrationsDir: 'src/database/migration',
        },
      logger: 'file',
      synchronize: false, // never use TRUE in production!
    } as ConnectionOptions;
  }
}
export default new DatabaseConnection().getDatabaseConnection()
