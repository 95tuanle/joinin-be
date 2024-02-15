import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { EventService } from 'src/event/event.service';
import { Event } from 'src/event/schemas/event.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventUserService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private userService: UserService,
    private eventService: EventService,
  ) {}

  async joinEvent(eventId: string, userId: string): Promise<void> {
    await this.userService.addEventToUser(userId, eventId);
    await this.eventService.addUserToEvent(eventId, userId);
  }

  async quitEvent(eventId: string, userId: string): Promise<void> {
    await this.userService.removeEventFromUser(userId, eventId);
    await this.eventService.removeUserFromEvent(eventId, userId);
  }

  async getAllEventParticipant(eventId: string) {
    const event = await this.eventModel
      .findById(eventId)
      .populate('eventparticipant')
      .exec();
    return event.eventparticipant.map((participant) => {
      return {
        username: participant.lastName + ', ' + participant.firstName,
        email: participant.email,
      };
    });
  }
}
