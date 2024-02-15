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
  constructor(private eventService: EventService) {}

  @Post() createEvent(@Body() createEventDto: CreateEventDto) {
    const isValid = mongoose.Types.ObjectId.isValid(createEventDto.eventOwner);
    if (isValid) throw new HttpException('Invalid User Id', 400);
    return this.eventService.createEvent(createEventDto);
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Event Not Found', 404);
    const event = await this.eventService.getEventById(id);
    if (!event) throw new HttpException('Event Not Found', 404);
    return event;
  }

  @Patch()
  async updateEvent(
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(updateEventDto.eventId);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updateEvent = await this.eventService.updateEvent(updateEventDto);
    if (!updateEvent) throw new HttpException('User Not Found', 404);
    return updateEvent;
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedEvent = await this.eventService.deleteEvent(id);
    if (!deletedEvent) throw new HttpException('User Not Found', 404);
    return;
  }
}
