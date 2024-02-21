import {
  Body,
  Controller,
  Get,
  Patch,
  HttpException,
  Param,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import mongoose, { ObjectId } from 'mongoose';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createEvent(
    @Request() req: any,
    @Body() createEventDto: CreateEventDto,
  ) {
    console.log(createEventDto);
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

  @Get('joinin/:_id')
  async joinin(@Request() req: any, @Param('_id') _id: ObjectId) {
    if (!mongoose.Types.ObjectId.isValid(_id.toString()))
      throw new HttpException('Invalid ID', 400);
    const event = await this.eventService.findByIdWithoutPopulation(_id);
    if (!event) throw new HttpException('Event Not Found', 404);
    if (req.user._id.equals(event.organizer))
      throw new HttpException('Organizer Cannot Join', 400);
    if (event.participants.includes(req.user._id))
      throw new HttpException('Already Joined', 400);
    return await this.eventService.joinin(req.user._id, _id);
  }

  @Get('quit/:_id')
  async quit(@Request() req: any, @Param('_id') _id: ObjectId) {
    if (!mongoose.Types.ObjectId.isValid(_id.toString()))
      throw new HttpException('Invalid ID', 400);
    const event = await this.eventService.findByIdWithoutPopulation(_id);
    if (!event) throw new HttpException('Event Not Found', 404);
    if (req.user._id.equals(event.organizer))
      throw new HttpException('Organizer Cannot Quit', 400);
    if (!event.participants.includes(req.user._id))
      throw new HttpException('Already Quit', 400);
    return await this.eventService.quitEvent(req.user._id, _id);
  }

  @Patch('/:_id')
  async updateEvent(
    @Request() req: any,
    @Body() updateEventDto: UpdateEventDto,
    @Param('_id') _id: ObjectId,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(_id.toString());
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updateEvent = await this.eventService.updateEvent(
      req.user._id,
      updateEventDto,
      _id,
    );
    if (!updateEvent) throw new HttpException('User Not Found', 404);
    return updateEvent;
  }

  @Delete('/:_id')
  async deleteEvent(@Param('_id') _id: ObjectId) {
    const isValid = mongoose.Types.ObjectId.isValid(_id.toString());
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedEvent = await this.eventService.deleteEvent(_id);
    if (!deletedEvent) throw new HttpException('User Not Found', 404);
    return;
  }

  @Get()
  async getAllEvents(@Request() req: any) {
    return this.eventService.getEvents(req.user._id);
  }

  @Get('my')
  async getMyEvent(@Request() req: any) {
    return this.eventService.getCreatedEvent(req.user._id);
  }

  @Get('joined')
  async getJoinedEvent(@Request() req: any) {
    return this.eventService.getJoinedEvent(req.user._id);
  }
}
