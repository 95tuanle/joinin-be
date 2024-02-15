import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { UsersModule } from '../users/users.module'
import { EventsModule } from '../events/events.module'
import { UserModule } from '../user/user.module'

@Module({
  controllers: [AdminController],
  imports: [UserModule, UsersModule, EventsModule],
  providers: [AdminService],
})
export class AdminModule {}
