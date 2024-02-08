import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from 'src/dto/CreateEvent.dto';
import mongoose from 'mongoose';
import { UpdateEventDto } from 'src/dto/UpdateEvent.dto';

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService){}

    @Get()
    getEvents(){
        return this.eventsService.getEvents();
    }

    @Post()
    createEvent(@Body() createEventDto: CreateEventDto){
        return this.eventsService.createEvent(createEventDto);
    }

    @Get(':id')
    async getEventById(@Param('id') id: string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('Event Not Found', 404)
        const event = await this.eventsService.getEventById(id);
        if(!event) throw new HttpException('Event Not Found', 404)
        return event;
    }

    @Patch(':id')
    async updateEvnet(@Param('id') id: string, @Body() udpateEventDto :UpdateEventDto){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const updateEvent = await this.eventsService.updateEvent(id, udpateEventDto);
        if (!updateEvent) throw new HttpException('User Not Found', 404);
        return updateEvent;
    }

    @Delete(':id')
    async deleteEvent(@Param('id') id: string) {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) throw new HttpException('Invalid ID', 400);
      const deletedEvent = await this.eventsService.deleteEvent(id);
      if (!deletedEvent) throw new HttpException('User Not Found', 404);
      return;
    }  
}
