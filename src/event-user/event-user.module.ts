import { Module } from '@nestjs/common';
import { EventUserService } from './event-user.service';
import { EventUserController } from './event-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Event, EventSchema } from 'src/event/schemas/event.schema';
import { UserService } from 'src/user/user.service';
import { EventService } from 'src/event/event.service';

@Module({
  controllers: [EventUserController],
  exports: [MongooseModule, EventUserService],
  providers: [EventUserService, UserService, EventService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
})
export class EventUserModule {}
