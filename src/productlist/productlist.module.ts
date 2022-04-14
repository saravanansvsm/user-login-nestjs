import { Module } from '@nestjs/common';
import { Productlist } from './productlist.entity';
import { ProductsModule } from 'src/product/product.module';
import { ProductlistController } from './productlist.controller';
import { ProductlistService } from './productlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/product/constants';
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3000s' },
    }),
    TypeOrmModule.forFeature([Productlist]),
    ProductsModule,
  ],
  controllers: [ProductlistController],
  providers: [ProductlistService],
})
export class ProductlistModule {}
