import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm";
import { MechanicsService } from "./mechanics.service";
import { MechanicsController } from "./mechanics.controller";
import { Mechanic } from "./entities/mechanic.entity";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
@Module({
         imports: [
                  TypeOrmModule.forFeature([Mechanic]),
                  PassportModule.register({ defaultStrategy: 'jwt' }),
                  JwtModule.register({
                           secret: process.env.JWT_SECRET || 'MY_SECRET_KEY_REPAIR_APP', 
                           signOptions: { expiresIn: '7d' },
                  }),
         ],
         controllers: [MechanicsController],
         providers: [
                  MechanicsService,
                  JwtStrategy
         ],
         exports: [MechanicsService]
})

export class MechanicModule { }