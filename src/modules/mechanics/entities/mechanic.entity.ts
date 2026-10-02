import { ObjectId } from "mongodb";
import { Entity, ObjectIdColumn, Column, Index } from "typeorm";
@Entity("mechanics")
export class Mechanic {
   @ObjectIdColumn()
   _id: ObjectId;

   @Column()
   name: string;

   @Column()
   lastname?: string;

   @Column()
   gender: string;

   @Column()
   birth: Date

   @Column()
   @Index({unique: true})
   phone: string;

   @Column()
   email: string;

   @Column()
   passwordHash: string;

   @Column()
   experienceYears?: number;

   @Column()
   specialties?: string;

   @Column({ default: true })
   isActive: boolean;

   @Column()
   profile?: string;

   @Column()
   province: string;

   @Column()
   district: string;

   @Column()
   village: string;

   @Column()
   certificate?: string;

   @Column()
   job: string;

   @Column()
   chievements?: string[];

   @Column()
   documentType: string;

   @Column()
   documentId: string;

   @Column()
   documentImage: string[];
}