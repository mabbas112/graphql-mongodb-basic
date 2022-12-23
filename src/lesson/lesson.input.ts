import { Field, ID, InputType } from "@nestjs/graphql";
import { IsDateString, MinLength, IsUUID } from 'class-validator';


@InputType()
export class LessonInput {

    @MinLength(4)
    @Field()
    name: string

    @IsDateString()
    @Field()
    startDate: string

    @IsDateString()
    @Field()
    endDate: string

    @IsUUID('4', { each: true })
    @Field(() => [ID], { defaultValue: [] })
    students: string[]

}