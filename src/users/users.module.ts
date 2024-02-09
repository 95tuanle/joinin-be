import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModule } from '../user/user.module';
import { UsersController } from './users.controller';

@Module({
  imports: [UserModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
