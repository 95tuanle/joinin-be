import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminService {
  constructor(private userService: UserService) {}

  async signUp(createAdminDto: CreateAdminDto) {
    return this.userService.create(createAdminDto);
  }
}
