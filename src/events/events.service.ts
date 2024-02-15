import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Event } from '../event/schemas/event.schema'
import { Model } from 'mongoose'

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  findAll(): Promise<Event[]> {
    return this.eventModel.find()
  }

  findUpcoming() {
    return this.eventModel.find({ date: { $gte: new Date() } })
  }
}
