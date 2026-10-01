import { Controller, Post, Get, Body, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { MechanicsService } from './mechanics.service';
import { MechanicDto } from './dto/mechanic.dto';
import { Throttle } from '@nestjs/throttler';
import { LoginMechanicDto } from './dto/login-mechanic.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('mechanics')
export class MechanicsController {
  constructor(private readonly mechanicsService: MechanicsService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('register')
  async register(@Body() createMechanicDto: MechanicDto) {
    return await this.mechanicsService.register(createMechanicDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MECHANIC')
  @Get()
  async getAllMechanics() {
    return await this.mechanicsService.findAll();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginMechanicDto: LoginMechanicDto) {
    return this.mechanicsService.login(loginMechanicDto);
  }
}