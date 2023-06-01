import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelizConfig.service';
import { databaseConfig } from './config/configuration';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService, //настройки нашего БД передадим в useClass
    }),

    ConfigModule.forRoot({
      //корневой config для nestjs
      load: [databaseConfig], //наш databaseConfig из configuration.ts
    }),
    
    UsersModule,
  ],
})
export class AppModule {}
