import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller';
import { StudentsEntity } from './students.entity';
import { StudentsService } from './students.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentsEntity])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
