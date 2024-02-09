import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventModule } from '../event/event.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [EventModule],
})
export class EventsModule {}
