import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateStudentsDto } from './Dto/students.dto';
import { StudentsEntity } from './students.entity';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private service: StudentsService) {}
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<StudentsEntity> {
    console.log('id', id);
    return this.service.findById(+id);
  }

  @Post()
  async createStudents(@Body() body: CreateStudentsDto) {
    return this.service.createStudents(body);
  }

  @Post('/update')
  async updateStudents(get_id: number, @Body() getinput: any) {
    return this.service.update_students(get_id, getinput);
  }

  @Post('/delete')
  async deleteStudents(get_id: number, @Body() getinput: any) {
    return this.service.delete_students(get_id, getinput);
  }
}
