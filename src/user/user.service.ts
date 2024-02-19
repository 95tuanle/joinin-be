import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByIdWithoutPassword(_id: ObjectId): Promise<User | undefined> {
    return await this.userModel.findById(_id, '-password').exec();
  }

  async findRoleById(_id: ObjectId): Promise<User | undefined> {
    return await this.userModel.findById(_id, 'role').exec();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async create(createDto: CreateUserDto | CreateAdminDto): Promise<User> {
    return await new this.userModel(createDto).save();
  }

  // async addEventToUser(userId: string, eventId: string): Promise<User> {
  //   return await this.userModel
  //     .findByIdAndUpdate(userId, {
  //       $addToSet: { events: eventId },
  //     })
  //     .exec();
  // }

  // async removeEventFromUser(userId: string, eventId: string): Promise<User> {
  //   return await this.userModel
  //     .findByIdAndUpdate(userId, {
  //       $pull: { events: eventId },
  //     })
  //     .exec();
  // }
}
