import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { In, Repository } from 'typeorm';
import { StudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid'
import { StudentType } from './student.type';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>

    ) { }

    async createStudent(studentInput: StudentInput): Promise<StudentType> {
        const student = this.studentRepository.create({
            id: uuid(),
            ...studentInput
        })
        return await this.studentRepository.save(student);
    }

    async getAllStudent(): Promise<StudentType[]> {
        return await this.studentRepository.find()
    }

    async getStudentById(id: string): Promise<StudentType> {
        return await this.studentRepository.findOne({
            where: { id }
        })
    }

    async getManyStudents(studentIds: string[]): Promise<StudentType[]> {

        console.log({studentIds})
        // const students = await this.studentRepository.findBy({ id: In(studentIds) });
        const students = await this.studentRepository.findBy({
            id: In(studentIds)
        })

        console.log({students})

        return students

    }
}
