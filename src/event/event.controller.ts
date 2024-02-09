import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import mongoose from 'mongoose';
import { UpdateEventDto } from 'src/event/dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private eventsService: EventService) {}

  @Get()
  getEvents() {
    return this.eventsService.getEvents();
  }

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Event Not Found', 404);
    const event = await this.eventsService.getEventById(id);
    if (!event) throw new HttpException('Event Not Found', 404);
    return event;
  }

  @Patch(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updateEvent = await this.eventsService.updateEvent(
      id,
      updateEventDto,
    );
    if (!updateEvent) throw new HttpException('User Not Found', 404);
    return updateEvent;
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedEvent = await this.eventsService.deleteEvent(id);
    if (!deletedEvent) throw new HttpException('User Not Found', 404);
    return;
  }
}
