import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  eventName: string;

  @Prop({ required: true })
  eventDesc: string;

  @Prop({ required: true })
  eventVenue: string;

  @Prop({ required: true })
  eventDateTime: Date;

  @Prop({ required: true, default: true })
  validEvent: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
