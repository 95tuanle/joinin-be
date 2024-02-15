import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { UserModule } from './user/user.module'
import { EventsModule } from './events/events.module'
import { EventModule } from './event/event.module'
import { RolesGuard } from './auth/guards/roles.guard'
import { AdminModule } from './admin/admin.module'
import { EventUserModule } from './event-user/event-user.module'

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    UserModule,
    UsersModule,
    MongooseModule.forRoot(
      process.env['MONGODB_URI']
        .replace('<password>', process.env.MONGODB_PASSWORD)
        .replace('<database>', process.env.MONGODB_DATABASE)
    ),
    EventModule,
    EventsModule,
    AdminModule,
    EventUserModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
