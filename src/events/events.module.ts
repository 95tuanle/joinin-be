import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/schemas/event.schema';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Event.name,
            schema: EventSchema
        }
    ])],
    controllers: [EventsController],
    providers: [EventsService]
})
export class EventsModule {}
