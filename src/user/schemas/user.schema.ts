import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

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

  @Prop({ required: true }) firstName: string;

  @Prop() lastName?: string;

  @Prop({ default: null }) oauthProvider: string;

  @Prop({ default: null }) oauthId: string;

  @Prop({
    type: String,
    enum: [Role.User, Role.Admin],
    default: Role.User,
  })
  role: Role.User | Role.Admin;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }] })
  // events: Event[];
}

export const UserSchema = SchemaFactory.createForClass(User);
