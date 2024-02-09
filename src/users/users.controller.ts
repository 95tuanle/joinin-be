import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get() // TODO: only allow admin users to access this endpoint
  async findAll() {
    return this.usersService.findAll();
  }
}
