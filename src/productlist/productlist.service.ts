import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Productlist } from './productlist.entity';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductlistService {
  constructor(
    @InjectRepository(Productlist)
    private readonly repository: Repository<Productlist>,
    private jwtService: JwtService,
  ) {}

  async getProduct(id: number): Promise<Productlist> {
    return this.repository.findOne(id);
  }

  async getallProduct() {
    console.log('selected');
    return this.repository.find();
  }

  async createProduct(body: CreateProductDTO) {
    const get_product = await this.repository.findOne({
      where: { productlist: body.productlist },
    });

    console.log('get_product', get_product);

    if (get_product) {
      const response_status = {};
      response_status['response_message'] = 'Productlist';
      return response_status;
    } else {
      const product: any = new Productlist();
      product.productlist = body.productlist;
      product.brand = body.brand;
      product.modal = String(body.modal);
      return this.repository.save(product);
    }
  }

  async findByproductlist(Productlist: string): Promise<Productlist> {
    return await this.repository.findOne({
      where: {
        productlist: Productlist,
      },
    });
  }

  async readProductlist(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<Productlist>) {
    //  this.repository.findOne({ where: { id: id } });
    await this.repository.update({ id: id }, data);
    return await this.repository.findOne({ id });
  }

  async update_product(get_id: number, productinput: any) {
    console.log('id', productinput.id);
    console.log('get_productinput', productinput);
    const user_input = {};
    user_input['productlist'] = productinput.productlist;
    user_input['brand'] = productinput.brand;
    user_input['modal'] = productinput.modal;
    const id = productinput.id;
    const up_res = await this.repository.update({ id }, user_input);
    return up_res;
  }

  async destroy_product(del_id: number, productinput: any) {
    const id: number = productinput.id;

    await this.repository.delete({ id });
    return { deleted: true };
    const get_input = await this.repository.findOne({ where: { id: id } });

    console.log('get_input', id);
    console.log('get_input', get_input);
    if (get_input) {
      console.log('id', del_id);
      console.log('del_userinput', productinput);

      await this.repository.delete({ id });
      return { deleted: true };
    } else {
      const response_status = {};
      response_status['response_message'] = 'Already deleted';
      return response_status;
    }
  }

  async login(get_input: any) {
    const get_product = await this.repository.findOne({
      where: { modal: get_input.modal },
    });

    console.log('get_product', get_product);

    if (get_product) {
      console.log('get_product.modal', get_product.modal);
      console.log('get_input.modal', get_input.modal);
      if (get_product.modal == get_input.modal) {
        const response_status = {};

        const payload = { productname: 'car' };
        const access_token = this.jwtService.sign(payload);
        console.log('access_token', access_token);
        response_status['access_token'] = access_token;
        response_status['response_message'] = 'modal is purchased';
        return response_status;
      } else {
        const response_status = {};
        response_status['response_message'] = 'Code Invalid';
        return response_status;
      }
    } else {
      const response_status = {};
      response_status['response_message'] = 'purchase Invalid';
      return response_status;
    }
    return null;
  }
}
