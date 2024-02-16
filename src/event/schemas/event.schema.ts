import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Event {
  @Prop({ required: true }) name: string;

  @Prop({ required: true }) description: string;

  @Prop({ required: true }) venue: string;

  @Prop({ required: true }) startDate: Date;

  @Prop({ required: true }) endDate: Date;

  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ required: true, default: true })
  isValid: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  participants: User[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
