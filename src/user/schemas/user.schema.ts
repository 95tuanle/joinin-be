import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Event } from 'src/event/schemas/event.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    required() {
      return !this.oauthProvider || !this.oauthId;
    },
  })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName?: string;

  @Prop({ default: null })
  oauthProvider: string;

  @Prop({ default: null })
  oauthId: string;

  @Prop({
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: 'user' | 'admin';

  @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]})
  events: Event[]
}

export const UserSchema = SchemaFactory.createForClass(User);
