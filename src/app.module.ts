import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    AuthModule,
    // UserModule,
    MongooseModule.forRoot(
      process.env['MONGODB_URI']
        .replace('<password>', process.env.MONGODB_PASSWORD)
        .replace('<database>', process.env.MONGODB_DATABASE),
    ),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
