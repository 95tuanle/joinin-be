import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import { Event } from 'src/event/schemas/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(
    organizerId: ObjectId,
    createEventDto: CreateEventDto,
  ): Promise<Event> {
    const newEvent = new this.eventModel({
      ...createEventDto,
      organizer: organizerId,
    });
    await newEvent.save();
    return newEvent.populate(
      'organizer',
      '-password -role -oauthProvider -oauthId -events',
    );
  }

  async joinin(
    participantId: ObjectId,
    eventId: ObjectId,
  ): Promise<Event | undefined> {
    return await this.eventModel
      .findByIdAndUpdate(
        eventId,
        {
          $addToSet: { participants: participantId },
        },
        { new: true },
      )
      .populate(
        'organizer participants',
        '-password -role -oauthProvider -oauthId -events',
      )
      .exec();
  }

  async findById(_id: ObjectId): Promise<Event | undefined> {
    return await this.eventModel
      .findById(_id)
      .populate(
        'organizer participants',
        '-password -role -oauthProvider -oauthId -events',
      )
      .exec();
  }

  async findByIdWithoutPopulation(_id: ObjectId): Promise<Event | undefined> {
    return await this.eventModel.findById(_id).exec();
  }

  // async getEvents(): Promise<Event[] | undefined> {
  //   return this.eventModel.find().exec();
  // }

  // async addUserToEvent(eventId: string, userId: string) {
  //   return this.eventModel
  //     .findByIdAndUpdate(eventId, {
  //       $addToSet: { participants: userId },
  //     })
  //     .exec();
  // }

  // async updateEvent(userId: string, updateEventDto: UpdateEventDto) {
  //   const event = await this.eventModel.findById(updateEventDto.eventId).exec();
  //   const user = await this.eventModel
  //     .findById(updateEventDto.eventId)
  //     .populate('eventOrganizer')
  //     .exec();
  //   if (!event || user._id.toString() !== userId)
  //     throw new UnauthorizedException('Not Authorized changes');
  //   return this.eventModel
  //     .findByIdAndUpdate(updateEventDto.eventId, updateEventDto, { new: true })
  //     .exec();
  // }

  // async deleteEvent(id: string) {
  //   return this.eventModel.findByIdAndDelete(id).exec();
  // }

  // async removeUserFromEvent(eventId: string, userId: string) {
  //   return this.eventModel
  //     .findByIdAndUpdate(eventId, {
  //       $pull: { participants: userId },
  //     })
  //     .exec();
  // }
}
