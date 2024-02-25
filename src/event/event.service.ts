import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import { Event } from 'src/event/schemas/event.schema';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(
    organizerId: ObjectId,
    createEventDto: CreateEventDto,
  ): Promise<Event> {
    const event = new this.eventModel({
      ...createEventDto,
      organizer: organizerId,
    });
    await event.save();
    return event.populate(
      'organizer',
      '-password -role -oauthProvider -oauthId -events',
    );
  }

  async join(
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

  async leave(participantId: ObjectId, eventId: ObjectId) {
    return await this.eventModel
      .findByIdAndUpdate(
        eventId,
        {
          $pull: { participants: participantId },
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

  async getEvents(userId: string): Promise<Event[] | undefined> {
    return this.eventModel
      .find({
        isValid: true,
        organizer: { $ne: userId },
        participants: { $nin: userId },
        endAt: { $gt: +new Date() },
      })
      .sort({ startAt: 'asc' })
      .exec();
  }

  async getJoinedEvent(userId: string): Promise<Event[] | undefined> {
    return this.eventModel
      .find({
        isValid: true,
        organizer: { $ne: userId },
        participants: { $in: userId },
        endAt: { $gt: +new Date() },
      })
      .sort({ startAt: 'asc' })
      .exec();
  }

  async getCreatedEvent(userId: string) {
    return this.eventModel
      .find({ organizer: userId })
      .sort({ startAt: 'asc' })
      .exec();
  }

  // async addUserToEvent(eventId: string, userId: string) {
  //   return this.eventModel
  //     .findByIdAndUpdate(eventId, {
  //       $addToSet: { participants: userId },
  //     })
  //     .exec();
  // }

  async updateEvent(
    userId: any,
    updateEventDto: UpdateEventDto,
    _id: ObjectId,
  ) {
    //const event = await this.eventModel.findById(_id).exec();
    //const user = await this.userService.findByIdWithoutPassword(userId);
    // if (!event || !user || user.email !== event.organizer.email)
    //   throw new UnauthorizedException('Not Authorized changes');
    return this.eventModel
      .findByIdAndUpdate(_id, updateEventDto, { new: true })
      .exec();
  }

  async deleteEvent(id: ObjectId) {
    return this.eventModel.findByIdAndUpdate(id, { isValid: false }).exec();
  }

  async quitEvent(
    participantId: ObjectId,
    eventId: ObjectId,
  ): Promise<Event | undefined> {
    return this.eventModel
      .findByIdAndUpdate(
        eventId,
        {
          $pull: { participants: participantId },
        },
        { new: true },
      )
      .populate(
        'organizer participants',
        '-password -role -oauthProvider -oauthId -events',
      )
      .exec();
  }
}
