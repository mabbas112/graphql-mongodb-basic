import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';


@InputType()
export class StudentInput {

    
    @Field()
    @MinLength(4)
    firstName: string

    @Field()
    @MinLength(4)
    lastName: string

}