import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import { Event } from 'src/event/schemas/event.schema';
import { UserService } from 'src/user/user.service';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private userService: UserService,
  ) {}

  async createEvent(userId: any, createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel();
    newEvent.title = createEventDto.title;
    newEvent.description = createEventDto.description;
    newEvent.startAt = createEventDto.startAt;
    newEvent.endAt = createEventDto.endAt;
    newEvent.location = createEventDto.location;
    newEvent.organizer = await this.userService.findByIdWithoutPassword(userId);
    return await newEvent.save();
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

  async getEvents(): Promise<Event[] | undefined> {
    return this.eventModel.find({ isValid: true }).exec();
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
