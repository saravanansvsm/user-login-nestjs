import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Product } from './product.entity';
import { SelectProductDto } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private jwtService: JwtService,
  ) {}

  public getProduct(id: number): Promise<Product> {
    return this.repository.findOne(+id);
  }

  public getallProduct() {
    console.log('selected');
    return this.repository.find();
  }

  async selectModal(body: SelectProductDto) {
    const get_product = await this.repository.findOne({
      where: { name: body.name },
    });

    console.log('get_product', get_product);

    if (get_product) {
      const response_status = {};
      response_status['response_message'] = 'car modal is selected';
      return response_status;
    } else {
      const product: any = new Product();
      product.name = body.name;
      product.modal = body.modal;
      product.code = body.code;
      product.price = Number(body.price);
      return this.repository.save(product);
    }
  }

  async findBymodal(modal: string): Promise<Product> {
    return await this.repository.findOne({
      where: {
        modal: modal,
      },
    });
  }

  async readProduct(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<Product>) {
    //  this.repository.findOne({ where: { id: id } });
    await this.repository.update({ id: id }, data);
    return await this.repository.findOne({ id });
  }

  async update_product(get_id: number, productinput: any) {
    console.log('id', productinput['id']);
    console.log('get_productinput', productinput);
    const user_input = {};
    user_input['productlist'] = productinput.Productlist;
    user_input['brand'] = productinput.brand;
    user_input['modal'] = productinput.modal;
    const id = productinput.id;
    const reslt = await this.repository.update({ id }, user_input);
    return reslt;
  }

  async destroy_product(del_id: number, productinput: any) {
    const id: number = del_id;
    const get_input = await this.repository.findOne({ where: { id: 1 } });

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
      console.log('get_product.code', get_product.code);
      console.log('get_input.code', get_input.code);
      if (get_product.code == get_input.code) {
        const response_status = {};

        const payload = { productname: 'car' };
        const access_token = this.jwtService.sign(payload);
        console.log('access_token', access_token);

        // response_status['id'] = 1;
        // response_status['name'] = 'car';
        // response_status['modal'] = 'SUV';
        // response_status['code'] = '***';
        response_status['access_token'] = access_token;
        response_status['response_message'] = 'Selected modal is purchased';
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
