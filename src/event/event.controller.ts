import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import mongoose, { ObjectId } from 'mongoose';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async createEvent(
    @Request() req: any,
    @Body() createEventDto: CreateEventDto,
  ) {
    return await this.eventService.createEvent(req.user._id, createEventDto);
  }

  @Get('get-by-id/:_id')
  async getEventById(@Param('_id') _id: ObjectId) {
    if (!mongoose.Types.ObjectId.isValid(_id.toString()))
      throw new HttpException('Invalid ID', 400);
    const event = await this.eventService.findById(_id);
    if (event) return event;
    throw new HttpException('Event Not Found', 404);
  }

  @Get('join/:_id')
  async join(@Request() req: any, @Param('_id') _id: ObjectId) {
    if (!mongoose.Types.ObjectId.isValid(_id.toString()))
      throw new HttpException('Invalid ID', 400);
    const event = await this.eventService.findByIdWithoutPopulation(_id);
    if (!event || !event.isValid)
      throw new HttpException('Event Not Found', 404);
    if (req.user._id.equals(event.organizer))
      throw new HttpException('Organizer Cannot Join', 400);
    if (event.participants.includes(req.user._id))
      throw new HttpException('Already Joined', 400);
    return await this.eventService.join(req.user._id, _id);
  }

  @Get('leave/:_id')
  async leave(@Request() req: any, @Param('_id') _id: ObjectId) {
    if (!mongoose.Types.ObjectId.isValid(_id.toString()))
      throw new HttpException('Invalid ID', 400);
    const event = await this.eventService.findByIdWithoutPopulation(_id);
    if (!event) throw new HttpException('Event Not Found', 404);
    if (!event.participants.includes(req.user._id))
      throw new HttpException('Not Joined', 400);
    return await this.eventService.leave(req.user._id, _id);
  }

  // @Patch()
  // async updateEvent(
  //   @Request() req: any,
  //   @Body() updateEventDto: UpdateEventDto,
  // ) {
  //   const isValid = mongoose.Types.ObjectId.isValid(updateEventDto.eventId);
  //   if (!isValid) throw new HttpException('Invalid ID', 400);
  //   const updateEvent = await this.eventService.updateEvent(
  //     req.user._id,
  //     updateEventDto,
  //   );
  //   if (!updateEvent) throw new HttpException('User Not Found', 404);
  //   return updateEvent;
  // }

  // @Delete(':id')
  // async deleteEvent(@Param('id') id: string) {
  //   const isValid = mongoose.Types.ObjectId.isValid(id);
  //   if (!isValid) throw new HttpException('Invalid ID', 400);
  //   const deletedEvent = await this.eventService.deleteEvent(id);
  //   if (!deletedEvent) throw new HttpException('User Not Found', 404);
  //   return;
  // }

  // @Get()
  // async getAllEvents() {
  //   return this.eventService.getEvents();
  // }
}
