import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid'
import { LessonInput } from './lesson.input';

@Injectable()
export class LessonService {

    constructor(
        @InjectRepository(Lesson)
        private lessonRepository : Repository<Lesson>
    ){}


    async createLesson (lessonInput : LessonInput) {
        const { name, startDate, endDate, students } = lessonInput
            const lesson = this.lessonRepository.create({
                id: uuid(),
                name, startDate, endDate,
                students
            })
            return await this.lessonRepository.save(lesson)
    }

    async getTask (id :string){
        return await this.lessonRepository.findOne({
            where : { id }
        })
    }

    async getAllLessons(): Promise<LessonInput[]>  {
        return await this.lessonRepository.find()
    }

    async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
        const lesson = await this.getTask(lessonId)
        lesson.students =  [...lesson.students, ...studentIds] 
        return await this.lessonRepository.save(lesson)
    }

}
