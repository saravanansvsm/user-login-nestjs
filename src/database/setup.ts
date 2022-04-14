/* eslint-disable @typescript-eslint/no-var-requires */
import { Environment } from '../common/contants/env-setup';
import { ConnectionOptions } from 'typeorm';
require('dotenv').config();

console.log('Environaments', Object.values(Environment));
console.log(process.env.NODE_ENV);
console.log(process.env.Development);
if (Object.values(Environment).includes(process.env.Development as any)) {
  console.log(`Running ${process.env.Development} Environment`);
} else {
  console.log(`Running Local Environment`);
  process.env.NODE_ENV = 'LOCAL';
}

if (process.env.Development == undefined) {
  console.log('Check the Condition');
  process.env.Development = 'LOCAL';
}

class DatabaseConnection {
  getDatabaseConnection() {
    return {
      type: 'postgres',
      host: process.env[`${process.env.Development}_POSTGRES_HOST`],
      port:
        parseInt(process.env[`${process.env.Development}_POSTGRES_PORT`]) ||
        5432,
      username: process.env[`${process.env.Development}_POSTGRES_USER`],
      password: process.env[`${process.env.Development}_POSTGRES_PASSWORD`],
      database: process.env[`${process.env.Development}_POSTGRES_DATABASE`],
      entities: ['dist/**/*.entity{ .ts,.js}'],
      schema: 'public',
      migrationRun: true,
      migrations: ['dist/database/migration/*.js'],
      logging: 'all',
      migrationsTableName: 'typeorm_migrations',
      //   ssl: {
      //     rejectUnauthorized: false,
      //   },
      cli: { migrationsDir: 'src/database/migration' },
      dropSchema: false,
    } as ConnectionOptions;
  }
}

export default new DatabaseConnection().getDatabaseConnection();
