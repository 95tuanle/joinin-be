import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserModule } from '../user/user.module'

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [UserModule],
  providers: [UsersService],
})
export class UsersModule {}
