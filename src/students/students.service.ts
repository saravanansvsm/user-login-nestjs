import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentsDto } from './Dto/students.dto';
import { StudentsEntity } from './students.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly repository: Repository<StudentsEntity>,
  ) {}

  async findAll() {
    return this.repository.find;
  }

  async findById(id: number): Promise<StudentsEntity> {
    return this.repository.findOne(+id);
  }

  async createStudents(
    // eslint-disable-next-line prettier/prettier
    studentsEntity: CreateStudentsDto): Promise<StudentsEntity> {
    return this.repository.save(studentsEntity);
  }

  async update_students(get_id: number, studentsinput: any) {
    console.log('id', get_id);
    console.log('get_studentsinput', studentsinput);
    const students_input = {};
    students_input['firstName'] = studentsinput.firstName;
    students_input['secondName'] = studentsinput.secondName;
    students_input['email'] = studentsinput.email;
    students_input['phone'] = studentsinput.phone;
    const id = studentsinput.id;
    await this.repository.update({ id }, students_input);
    return null;
  }

  async delete_students(del_id: number, studentsinput: any) {
    console.log('id', del_id);
    console.log('del_studentsinput', studentsinput);
    const id = studentsinput.id;
    await this.repository.delete({ id });
    return { deleted: true };
  }
}
