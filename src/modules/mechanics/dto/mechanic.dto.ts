import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MinLength,
  IsArray,
  ArrayNotEmpty,
  IsBoolean,
  IsOptional,
  IsDateString,
  IsEmail,
} from 'class-validator';

export class MechanicDto {
  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນຊື່' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນນາມສະກຸນ' })
  lastname: string;

  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນເພດ' })
  gender: string;

  @IsDateString(
    {},
    { message: 'ຮູບແບບວັນເກີດບໍ່ຖືກຕ້ອງ' },
  )
  birth: Date;

  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນເບີໂທ' })
  phone: string;

  @IsEmail({}, { message: 'Email ບໍ່ຖືກຕ້ອງ' })
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນ Email' })
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ',
  })
  password: string;

  @IsNumber()
  experienceYears: number;

  @IsArray()
  @ArrayNotEmpty({
    message: 'ກະລຸນາເລືອກຄວາມຊ່ຽວຊານ',
  })
  @IsString({ each: true })
  specialties: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  profile?: string;

  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາເລືອແຂວງ' })
  province: string;

  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາເລືອກເມືອງ' })
  district: string;

  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນບ້ານ' })
  village: string;

  @IsString()
  @IsOptional()
  certificate?: string;

  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາເລືອກອາຊີບ' })
  job: string;

  @IsArray()
  @IsString({ each: true })
  chievements?: string[];

  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາເລືອກປະເພດເອກະສານຢືນຢັນຕົວຕົນ' })
  documentType: string;

  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນເລກທີເອກະສານ' })
  documentId: string;

  @IsArray()
  @IsString({each: true})
  @IsNotEmpty({message: "ກະລຸນາອັບໂຫລດເອກະສານ"})
  documentImage: string[]

}