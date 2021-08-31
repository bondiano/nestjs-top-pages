import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { UserModel } from './user.model';
import { AuthService } from './auth.service';
import { JwtStategy } from './startegy/jwt.stategy';

import { getJWTConfig } from '../configs/jwt.config';

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'Auth',
        },
      },
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [AuthService, JwtStategy],
})
export class AuthModule {}
