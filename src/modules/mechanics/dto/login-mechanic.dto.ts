import { IsNotEmpty, IsString } from 'class-validator';

export class LoginMechanicDto {
  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນເບີໂທ' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນລະຫັດຜ່ານ' })
  password: string;
}