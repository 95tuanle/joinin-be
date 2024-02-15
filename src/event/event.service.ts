import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import { UpdateEventDto } from 'src/event/dto/update-event.dto';
import { Event } from 'src/event/schemas/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel(createEventDto);
    return await newEvent.save();
  }

  async getEvents(): Promise<Event[] | undefined> {
    return await this.eventModel.find();
  }

  async getEventById(id: string): Promise<Event | undefined>  {
    return await this.eventModel.findById(id);
  }

  //User Join an event
  async addUserToEvent(eventId: string, userId: string): Promise<void> {
    await this.eventModel.findByIdAndUpdate(
    eventId, 
    { $addToSet: { eventparticipant: userId }}
    );
  }

  //Owner Update the Event
  async updateEvent(updateEventDto: UpdateEventDto) {
    const event = await this.eventModel.findById(updateEventDto.eventId).exec();
    const user = await this.eventModel.findById(updateEventDto.eventId).populate('eventOwner').exec();
    if (!event || user._id.toString() !== updateEventDto.requestUser) throw new UnauthorizedException ('Not Authorized changes')
    return this.eventModel.findByIdAndUpdate(updateEventDto.eventId, updateEventDto, { new: true });
  }

  async deleteEvent(id: string) {
    return await this.eventModel.findByIdAndDelete(id);
  }

  async removeUserFromEvent(eventId: string, userId: string){
    await this.eventModel.findByIdAndUpdate(eventId, { $pull : { eventparticipant: userId }});
  }
}
