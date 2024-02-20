import { Controller, Get, Request } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('upcoming')
  async findUpcoming() {
    return await this.eventsService.findUpcoming();
  }

  @Get('joined')
  async findJoined(@Request() req: any) {
    return await this.eventsService.findJoined(req.user._id);
  }
}
