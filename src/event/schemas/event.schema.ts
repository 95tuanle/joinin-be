import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Event {
  @Prop({ required: true }) name: string;

  @Prop({ required: true }) description: string;

  @Prop({ required: true }) venue: string;

  @Prop({ required: true }) startDate: Date;

  @Prop({ required: true }) endDate: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
