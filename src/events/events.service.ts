import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../event/schemas/event.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async findAll() {
    return await this.eventModel.find().exec();
  }

  async findUpcoming() {
    return await this.eventModel
      .find({ startAt: { $gt: Date.now() } })
      .sort('startAt')
      .populate(
        'organizer participants',
        '-password -role -oauthProvider -oauthId -events',
      )
      .exec();
  }

  async findJoined(participantId: ObjectId) {
    return await this.eventModel
      .find({ participants: participantId })
      .populate(
        'organizer participants',
        '-password -role -oauthProvider -oauthId -events',
      )
      .exec();
  }
}
