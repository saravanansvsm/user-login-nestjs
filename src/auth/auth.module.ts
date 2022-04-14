import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from 'src/product/product.module';
import { UserModule } from '../api/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/api/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/api/user/user.entity';
import { Product } from 'src/product/product.entity';
import { Productlist } from 'src/productlist/productlist.entity';
import { ProductsService } from 'src/product/product.service';
import { ProductlistService } from 'src/productlist/productlist.service';
import { ProductlistModule } from 'src/productlist/productlist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, Productlist]),
    UserModule,
    PassportModule,
    ProductsModule,
    ProductlistModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    ProductsService,
    ProductlistService,
  ],
})
export class AuthModule {}
