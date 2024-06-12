import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from "@nestjs/serve-static"

import configDefault from '../config/config.default';

import { User } from './user/entities/user.entity';

import { join } from 'path';

console.log('path', join(__dirname, '../', 'public'));


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configDefault],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('mysql'));
        return {
          type: 'mysql',
          host: configService.get<string>('mysql.host'),
          port: +configService.get<number>('mysql.port'),
          username: configService.get<string>('mysql.username'),
          password: configService.get<string>('mysql.password'),
          database: configService.get<string>('mysql.database'),
          autoLoadEntities: true,
          synchronize: configService.get<boolean>('mysql.synchronize'),
          entities: [User]
        };
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/'
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})


export class AppModule { }