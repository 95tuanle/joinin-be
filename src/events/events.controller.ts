import { Controller, Get } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('upcoming')
  findUpcoming() {
    return this.eventsService.findUpcoming();
  }
}
