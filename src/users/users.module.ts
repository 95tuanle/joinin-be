import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
