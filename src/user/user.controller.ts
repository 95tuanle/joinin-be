import { Controller, Get, HttpException, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Request() req: any) {
    const user = await this.userService.findByIdWithoutPassword(req.user._id);
    if (user) return user;
    throw new HttpException('User not found', 404);
  }
}
