import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

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

  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'User'})
  eventOwner: User

  @Prop({ required: true, default: true })
  validEvent: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}] })
  eventparticipant: User[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
