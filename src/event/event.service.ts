import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import { UpdateEventDto } from 'src/event/dto/update-event.dto';
import { Event } from 'src/event/schemas/event.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private userService: UserService,
  ) {}

  async createEvent(userId: any, createEventDto: CreateEventDto) {
    let event = {
      ...createEventDto,
      owner: await this.userService.findByIdWithoutPassword(userId),
    };
    console.log(createEventDto.description);
    console.log(createEventDto.venue);
    console.dir(event);
    const res = await this.eventModel.create(event);
    return res;
  }

  async getEvents(): Promise<Event[] | undefined> {
    return this.eventModel.find({ isValid: true }).exec();
  }

  async getEventById(id: string): Promise<Event | undefined> {
    return this.eventModel.findById(id).exec();
  }

  //User Join an event
  async addUserToEvent(eventId: string, userId: string) {
    return this.eventModel
      .findByIdAndUpdate(eventId, {
        $addToSet: { participants: userId },
      })
      .exec();
  }

  //Owner Update the Event
  async updateEvent(userId: string, updateEventDto: UpdateEventDto) {
    const event = await this.eventModel.findById(updateEventDto.eventId).exec();
    const user = await this.eventModel
      .findById(updateEventDto.eventId)
      .populate('eventOwner')
      .exec();
    if (!event || user._id.toString() !== userId)
      throw new UnauthorizedException('Not Authorized changes');
    return this.eventModel
      .findByIdAndUpdate(updateEventDto.eventId, updateEventDto, { new: true })
      .exec();
  }

  async deleteEvent(id: string) {
    return this.eventModel.findByIdAndUpdate(id, { isValid: false }).exec();
  }

  async removeUserFromEvent(eventId: string, userId: string) {
    return this.eventModel
      .findByIdAndUpdate(eventId, {
        $pull: { participants: userId },
      })
      .exec();
  }
}
