/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Res,
  Req,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from  'path';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;
  usercontroller: any;
  
  @Get('/user/:id ')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(Number(id));
  }

  @Get()
  getallUser() {
    return this.service.getallUser().then 
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body);
  }

  @Post('/update')
  async updateUser(get_id: number, @Body() getinput: any) {
    return this.service.update_user(get_id, getinput);
  }

  @Post('/delete')
  async deleteUser(get_id: number, @Body() getinput: any) {
    return this.service.destroy_user(get_id, getinput);
  }

  @Post('login')
  async login(@Body() body: any) {
      return await this.service.login(body);
  }
}


