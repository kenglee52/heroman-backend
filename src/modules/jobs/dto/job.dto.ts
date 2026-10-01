import { IsString } from "class-validator";

export class JobDto {
   @IsString()
   job: string;
}