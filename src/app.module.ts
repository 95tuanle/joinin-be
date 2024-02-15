import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { EventModule } from './event/event.module';
import { EventUserModule } from './event-user/event-user.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    UserModule,
    UsersModule,
    MongooseModule.forRoot(
      process.env['MONGODB_URI']
        .replace('<password>', process.env.MONGODB_PASSWORD)
        .replace('<database>', process.env.MONGODB_DATABASE),
    ),
    EventModule,
    EventsModule,
    EventUserModule,
  ],
  providers: [
    AppService,
    /**
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    */
  ],
})
export class AppModule {}
