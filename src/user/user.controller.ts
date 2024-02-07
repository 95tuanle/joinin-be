import { Controller, Request, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getProfile(@Request() req: any) {
    return req.user;
  }
}
