import { ObjectId } from "mongodb";
import { Entity, ObjectIdColumn, Column, Index } from "typeorm";

@Entity("jobs")

export class Job {
   @ObjectIdColumn()
   _id : ObjectId 
   
   @Column()
   job: string;
}