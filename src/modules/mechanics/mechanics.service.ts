import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Mechanic } from './entities/mechanic.entity';
import { MechanicDto } from './dto/mechanic.dto';
import { LoginMechanicDto } from './dto/login-mechanic.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MechanicsService {
  constructor(
    @InjectRepository(Mechanic)
    private readonly mechanicRepository: MongoRepository<Mechanic>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: MechanicDto): Promise<Mechanic> {
    const existing = await this.mechanicRepository.findOneBy({ phone: dto.phone });
    if (existing) {
      throw new ConflictException('ເບີໂທນີ້ຖືກລົງທະບຽນແລ້ວ');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const mechanic = this.mechanicRepository.create({
      ...dto,
      passwordHash: hashedPassword,
    });

    return await this.mechanicRepository.save(mechanic);
  }

  async login(dto: LoginMechanicDto) {
    const mechanic = await this.mechanicRepository.findOneBy({ phone: dto.phone });
    if (!mechanic) {
      throw new UnauthorizedException('ເບີໂທ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, mechanic.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('ເບີໂທ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ');
    }

    const payload = {
      sub: mechanic._id.toString(),
      phone: mechanic.phone,
      role: 'MECHANIC',
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const { passwordHash, ...mechanicProfile } = mechanic;

    return {
      message: 'ເຂົ້າสู่ລະບົບສຳເລັດ',
      access_token: accessToken,
      role: 'MECHANIC',
      user: mechanicProfile,
    };
  }

  async findAll(): Promise<Mechanic[]> {
    return await this.mechanicRepository.find();
  }
}