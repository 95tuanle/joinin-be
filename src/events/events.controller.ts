import { Controller, Get } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('upcoming')
  async findUpcoming() {
    return await this.eventsService.findUpcoming();
  }
}
