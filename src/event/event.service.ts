import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import { UpdateEventDto } from 'src/event/dto/update-event.dto';
import { Event } from 'src/event/schemas/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(userId: string, createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel();
    newEvent.name = createEventDto.eventName;
    newEvent.description = createEventDto.eventDesc;
    newEvent.startDate = createEventDto.eventStartDate;
    newEvent.endDate = createEventDto.eventEndDate;
    newEvent.venue = createEventDto.eventVenue;
    return await newEvent.save();
  }

  async getEvents(): Promise<Event[] | undefined> {
    return this.eventModel.find().exec();
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
    return this.eventModel.findByIdAndDelete(id).exec();
  }

  async removeUserFromEvent(eventId: string, userId: string) {
    return this.eventModel
      .findByIdAndUpdate(eventId, {
        $pull: { participants: userId },
      })
      .exec();
  }
}
