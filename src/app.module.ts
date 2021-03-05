import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'
import {ValuteModule} from "./valute/valute.module";

import { WinstonModule } from 'nest-winston';
import LoggerConfig from './logger.config';
const logger: LoggerConfig = new LoggerConfig();

@Module({
  imports: [
    ConfigModule.forRoot({}),
    ValuteModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'cis_graphql',
      entities: ['src/**/*.model.ts'],
      migrations: ['src/database/migrations/*.ts'],
      synchronize: false,
    }),

    WinstonModule.forRoot(logger.console())
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
