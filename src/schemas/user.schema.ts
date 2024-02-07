import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

  @Prop({ required: true })
  password: string;

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
}

export const UserSchema = SchemaFactory.createForClass(User);