import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonInput } from './lesson.input';
import { AssignStudentsToLesson } from "./assignStudentsToLesson.type";
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {


    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ) { }

    @Query(returns => LessonType)
    getLesson(
        @Args('id') id: string
    ) {
        return this.lessonService.getTask(id);
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('lessonInput') lessonInput: LessonInput
    ) {
        return this.lessonService.createLesson(lessonInput)
    }

    @Query(returns => [LessonType])
    getAllLessons() {
        return this.lessonService.getAllLessons()
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLesson') assignStudentsToLesson: AssignStudentsToLesson
    ) {
        const { lessonId, studentIds } = assignStudentsToLesson

        return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return await this.studentService.getManyStudents(lesson.students)
    }

}