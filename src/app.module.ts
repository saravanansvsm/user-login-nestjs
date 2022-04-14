/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { ProductsModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ProductlistModule } from './productlist/productlist.module';
import { StudentsModule } from './students/students.module';
import connectionOptions from './database/setup';

require('dotenv').config();
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(connectionOptions),
    ApiModule,
    ProductsModule,
    AuthModule,
    ProductlistModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
