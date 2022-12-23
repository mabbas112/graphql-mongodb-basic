import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { LessonModule } from './lesson/lesson.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';

@Module({
  
  imports: [

    TypeOrmModule.forRoot({
    type:"mongodb",
    url: 'mongodb://localhost/school',
    logger: 'simple-console',
    synchronize: true, 
    useUnifiedTopology:true,
    entities: [Lesson, Student]
    }),
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
    playground: true,
    debug:true
  }), LessonModule, StudentModule],
})
export class AppModule {}
