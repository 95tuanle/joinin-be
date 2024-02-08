import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from 'src/dto/CreateEvent.dto';
import { UpdateEventDto } from 'src/dto/UpdateEvent.dto';
import { Event } from 'src/schemas/event.schema';

@Injectable()
export class EventsService {
    constructor(@InjectModel(Event.name) private eventModel: Model<Event>){}

    async createEvent(createEventDto: CreateEventDto){
        const newEvent = new this.eventModel(CreateEventDto);
        return newEvent.save();
    }

    getEvents(){
        return this.eventModel.find();
    }

    getEventById(id: string){
        return this.eventModel.findById(id);
    }

    updateEvent(id: string, updateEventDto: UpdateEventDto){
        return this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true});
    }

    deleteEvent(id: string){
        return this.eventModel.findByIdAndDelete(id);
    }
    
}
