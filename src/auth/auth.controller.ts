import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../public/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req: any) {
    return this.authService.signIn(req.user);
  }

  @Public()
  @Post('sign-up')
  async signUp(@Request() req: any) {
    return this.authService.signUp(req.body);
  }
}
