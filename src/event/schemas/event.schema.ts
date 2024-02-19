import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type UserDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true }) title: string;

  @Prop({ required: true }) description: string;

  @Prop({ required: true }) location: string;

  @Prop({ required: true }) startAt: number;

  @Prop({ required: true }) endAt: number;

  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'User' })
  organizer: User;

  @Prop({ required: true, default: true }) isValid: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  participants: User[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
