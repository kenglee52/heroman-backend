import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { JobDto } from "./dto/job.dto";

@Controller("jobs")

export class JobsController{
         constructor(private readonly jobsService: JobsService){}
         @Post()
         @HttpCode(HttpStatus.CREATED)
         create(@Body() jobDto: JobDto){
            return this.jobsService.create(jobDto);
         }

         @Get()
         findAll(){
            return this.jobsService.findAll();
         }

         @Get(":id")
         findById(@Param("id") id: string){
            return this.jobsService.findById(id);
         }

         @Put(":id")
         update(@Param("id") id: string, @Body() jobDto: JobDto){
            return this.update(id, jobDto);
         }

         @Delete(":id")
         delete(@Param("id") id: string){
            return this.jobsService.detete(id);
         }
}