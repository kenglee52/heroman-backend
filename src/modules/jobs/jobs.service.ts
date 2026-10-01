import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";
import { Job } from "./entities/job.entity";
import { JobDto } from "./dto/job.dto";

@Injectable()
export class JobsService {
         constructor(
                  @InjectRepository(Job)
                  private readonly jobRepository: MongoRepository<Job>
         ) { }

         async create(jobDto: JobDto): Promise<Job> {
                  const job = this.jobRepository.create(jobDto);
                  return await this.jobRepository.save(job);
         }

         async findAll(): Promise<Job[]> {
                  return await this.jobRepository.find();
         }

         async findById(id: string): Promise<Job> {
                  if (!ObjectId.isValid(id)) {
                           throw new BadRequestException(`Invalid job id: ${id}`);
                  }
                  const job = await this.jobRepository.findOneBy({
                           _id: new ObjectId(id),
                  });
                  if (!job) {
                           throw new NotFoundException(`Job with id ${id} not found`);
                  }
                  return job;
         }

         async update(id: string, jobDto: JobDto): Promise<Job> {
              const job = await this.findById(id);
              Object.assign(job, jobDto);
              return await this.jobRepository.save(job);
         }

         async detete(id: string): Promise<Job>{
             const job = await this.findById(id);
             const deleted = await this.jobRepository.remove(job);
             return deleted;
         }
}