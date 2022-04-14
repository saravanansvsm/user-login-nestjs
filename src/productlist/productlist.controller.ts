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
import { Productlist } from './productlist.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductlistService } from './productlist.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('productlist')
export class ProductlistController {
  @Inject(ProductlistService)
  private readonly service: ProductlistService;
  productlistcontroller: any;

  @Get('/productlist/:id')
  @UseGuards(JwtAuthGuard)
  async getProductlist(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Productlist> {
    console.log('id', id);
    return this.service.getProduct(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getallProductlist() {
    return this.service.getallProduct();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async CreateProduct(@Body() body: CreateProductDTO) {
    console.log('id----3333333---', body);
    return this.service.createProduct(body);
  }

  @Put('/update')
  async updateProduct(get_id: number, @Body() getinput: any) {
    console.log('id----222222222222222---');
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
