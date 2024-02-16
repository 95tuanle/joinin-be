import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { EventUserService } from './event-user.service';
import mongoose from 'mongoose';
import { QuitEventDto } from './dto/quit-event.dto';

@Controller('event-user')
export class EventUserController {
  constructor(private eventUserService: EventUserService) {}

  @Get(':id/participant')
  async getAllEventParticipant(@Param('id') eventId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(eventId);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const participants =
      await this.eventUserService.getAllEventParticipant(eventId);
    if (!participants) throw new HttpException('User Not Found', 404);
    return participants;
  }

  @Post('join')
  async joinEvent(@Body() joinEventDto: QuitEventDto) {
    const eventIdIsValid = mongoose.Types.ObjectId.isValid(
      joinEventDto.eventId,
    );
    if (!eventIdIsValid) throw new HttpException('Invalid Event ID', 400);
    const userIdIsValid = mongoose.Types.ObjectId.isValid(
      joinEventDto.requestUser,
    );
    if (!userIdIsValid) throw new HttpException('Invalid User ID', 400);
    return this.eventUserService.joinEvent(
      joinEventDto.eventId,
      joinEventDto.requestUser,
    );
  }

  @Post('quit')
  async quitEvent(@Body() quitEventDto: QuitEventDto) {
    const eventIdIsValid = mongoose.Types.ObjectId.isValid(
      quitEventDto.eventId,
    );
    if (!eventIdIsValid) throw new HttpException('Invalid Event ID', 400);
    const userIdIsValid = mongoose.Types.ObjectId.isValid(
      quitEventDto.requestUser,
    );
    if (!userIdIsValid) throw new HttpException('Invalid User ID', 400);
    return this.eventUserService.quitEvent(
      quitEventDto.eventId,
      quitEventDto.requestUser,
    );
  }
}
