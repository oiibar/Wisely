import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    TransactionModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      configService: ConfigService
      useFactory: () => ({
        type: 'postgres',
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_NAME'),
        host: 'wisely-wisely.g.aivencloud.com',
        port: 13611,
        username: 'avnadmin',
        password: 'AVNS_8T6Z02fiMHMdqyJO95T',
        database: 'defaultdb',
        // host: 'localhost',
        // database: 'wisely',
        // username: 'postgres',
        // port: 5432,
        // password: '123',
        synchronize: true,
        ssl: {
          rejectUnauthorized: true,
          ca: fs.readFileSync('src/ca.pem').toString(),
        },
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
