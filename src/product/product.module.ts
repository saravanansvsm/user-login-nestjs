import { Module } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsService } from './product.service';
import { ProductsController } from './product.controller';
import { UserModule } from 'src/api/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../product/constants';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3000s' },
    }),
    TypeOrmModule.forFeature([Product]),
    UserModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
