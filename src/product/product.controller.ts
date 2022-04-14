import {
  Body,
  Get,
  Post,
  Put,
  Delete,
  Controller,
  ParseIntPipe,
  Param,
  Inject,
  UseGuards,
} from '@nestjs/common';
// import { Crud } from '@nestjsx/crud';
import { Product } from './product.entity';
import { SelectProductDto } from './product.dto';
import { ProductsService } from './product.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('product')
export class ProductsController {
  @Inject(ProductsService)
  private readonly service: ProductsService;
  productcontroller: any;

  @Get('/product/:id')
  @UseGuards(JwtAuthGuard)
  async getProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    console.log('id', id);
    return this.service.getProduct(id);
  }

  @Get()
  getallProduct() {
    return this.service.getallProduct();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async SelectModal(@Body() body: SelectProductDto) {
    return this.service.selectModal(body);
  }

  @Put('/update')
  async updateProduct(get_id: number, @Body() getinput: any) {
    console.log('id');
    return this.service.update_product(get_id, getinput);
  }

  @Delete('/delete/:get_id')
  async deleteProduct(get_id: number, @Body() getinput: any) {
    return this.service.destroy_product(get_id, getinput);
  }

  @Post('login')
  async login(@Body() body: any) {
    return await this.service.login(body);
  }
}
