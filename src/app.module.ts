import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entity/user.entity';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
   GraphQLModule.forRoot({
    driver: ApolloDriver,
    playground: true,   //where all graphQL queries will be tested
    autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),    //to generate automatic schemas by NestJs or by typescript
    definitions: {  //to genrate automatic interfaces
      path: join(process.cwd(), 'src/graphql.ts'),
    }
    // typePaths: ['./**/*.graphql'], //the path where my schema will be strored
  }),
  // ConfigModule.forRoot({isGlobal: true}),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database:  process.env.POSTGRES_DB,
    entities: [UserEntity],
    synchronize: true,
  }),
  AuthModule, UserModule ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
