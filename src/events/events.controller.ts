import { Controller, Get } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get() // TODO: only allow admin users to access this endpoint
  findAll() {
    return this.eventsService.findAll();
  }
}
