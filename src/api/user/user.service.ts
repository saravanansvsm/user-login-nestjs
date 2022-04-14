/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  
  // eslint-disable-next-line prettier/prettier
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private jwtService: JwtService,
  ) {}
   

  public getUser(id: number): Promise<User> {
    return this.repository.findOne(+id);
  }

  public getallUser() {
    console.log('entered');
    return this.repository.find();
  }

  async createUser(body: CreateUserDto) {
    const get_user = await this.repository.findOne({
      where: { email: body.email },
    });

    console.log('get_user', get_user);

    if (get_user) {
      const response_status = {};
      //get_user['response_message'] = 'user already exist';
      response_status['response_message'] = 'user already exist';
      return response_status;
    } else {
      const user: User = new User();
      user.name = body.name;
      user.email = body.email;
      user.password = body.password;
      return this.repository.save(user);
    }  }

  async findByEmail(email: string, password: string): Promise<User> {
    return await this.repository.findOne({
      where: {
        email: email,
        password: password,
      },
    });
  }

  async readUser(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<User>) {
    await this.repository.update({ id }, data);
    return await this.repository.findOne({ id });
  }

  async update_user(get_id: number, userinput: any) {
    console.log('id', get_id);
    console.log('get_userinput', userinput);
    const user_input = {};
    user_input['name'] = userinput.name;
    user_input['email'] = userinput.email;
    user_input['password'] = userinput.password;
    const id = userinput.id;
    await this.repository.update({ id }, user_input);
    return null;
  }

  async destroy_user(del_id: number, userinput: any) {
    console.log('id', del_id);
    console.log('del_userinput', userinput);
    const id = userinput.id;
    await this.repository.delete({ id });
    return { deleted: true };
  }

  async login(get_input: any) {
    const get_user = await this.repository.findOne({
      where: { email: get_input.email },
    });

    console.log('get_user', get_user);

    if (get_user) {
      console.log('get_user.password', get_user.password);
      console.log('get_input.password', get_input.password);
      if (get_user.password == get_input.password) {
        const response_status = {};

        
        const payload = { userId: 'number' };
        const access_token = this.jwtService.sign(payload, { secret:"secretKey", expiresIn: 3000});
        console.log('access_token', access_token);
        
        // response_status['id'] = 1;
        // response_status['name'] = 'mohit';
        // response_status['email'] = 'mohitsas@gmail.com';
        // response_status['password'] = '12334';
        response_status['access_token'] = access_token;
         response_status['response_message'] = 'Login sucessfully';
        return response_status;
      } else {
        const response_status = {};
        response_status['response_message'] = 'password Invalid';
        return response_status;
      }
    } else {
      const response_status = {};
      response_status['response_message'] = 'email ID Invalid';
      return response_status;
    }
    return null;
  }

  // async validateUser(name: string, password: string) {
  //   const user = await this.repository findOne(name);
  //   if (user)
  // }
}
