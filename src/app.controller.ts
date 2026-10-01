import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/keng/:vars')
  getHello(@Param("vars") vars: string, @Query("id") id : number): string {
    console.log(vars);
    console.log(id);
    return this.appService.getHello();
  }
}
