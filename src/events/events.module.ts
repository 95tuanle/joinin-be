import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventModule } from '../event/event.module';

@Module({
  controllers: [EventsController],
  exports: [EventsService],
  imports: [EventModule],
  providers: [EventsService],
})
export class EventsModule {}
