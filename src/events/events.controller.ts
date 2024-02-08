import { Controller, Get, Post } from '@nestjs/common';

@Controller('events')
export class EventsController {

    @Get()
    findAllEvent(){
        return []
    }

    @Post()
    createEvent(){
        return []
    }

    @Get()
    findOneEvent(){

    }
}
