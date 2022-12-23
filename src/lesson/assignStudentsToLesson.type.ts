import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssignStudentsToLesson {

    @Field( type => ID)
    @IsUUID('4', { each: true })
    lessonId: string

    @Field( type => [ID] )
    @IsUUID('4', { each: true })
    studentIds: string[]

}