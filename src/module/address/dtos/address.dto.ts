import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  phoneNumber: number;

  // userId: number;
}
