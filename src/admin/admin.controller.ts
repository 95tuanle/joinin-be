import { Body, Controller, Get, HttpException, Post } from '@nestjs/common'
import { Roles } from '../auth/decorators/roles.decorator'
import { Role } from '../auth/enums/role.enum'
import { UsersService } from '../users/users.service'
import { EventsService } from '../events/events.service'
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import * as bcrypt from 'bcrypt'

@Controller('admin')
@Roles(Role.Admin)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private usersService: UsersService,
    private eventsService: EventsService
  ) {}

  @Post('sign-up')
  async signUp(@Body() createAdminDto: CreateAdminDto) {
    createAdminDto.password = await bcrypt.hash(createAdminDto.password, 10)
    const admin = await this.adminService.signUp(createAdminDto)
    if (admin) {
      admin.password = undefined
      return admin
    }
    throw new HttpException('Unable to create admin', 500)
  }

  @Get('users')
  findAllUsers() {
    return this.usersService.findAll()
  }

  @Get('events')
  findAllEvents() {
    return this.eventsService.findAll()
  }
}
