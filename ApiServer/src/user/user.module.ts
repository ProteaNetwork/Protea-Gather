import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UserSchema } from './user.schema';
import { Schemas } from '../app.constants';

@Module({
  imports: [MongooseModule.forFeature([{ name: Schemas.User, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})

export class UsersModule { }
