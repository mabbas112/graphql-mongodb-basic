import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentInput } from './create-student.input';
import { StudentType } from './student.type';


@Resolver(of => StudentType)
export class StudentResolver {

    constructor(
        private studentService: StudentService
    ){}

    @Mutation(returns => StudentType)
    createStudent(
        @Args('studentInput') studentInput: StudentInput
        ) {
        return this.studentService.createStudent(studentInput)
    }

    @Query(returns => [StudentType])
    getAllStudents(){
        return this.studentService.getAllStudent()
    }

    @Query(returns => StudentType)
    getStudentById(
        @Args('id') 
        id: string
    ){
        return this.studentService.getStudentById(id)
    }
}