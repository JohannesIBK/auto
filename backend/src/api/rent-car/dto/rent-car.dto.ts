import { IsDate, IsDateString, IsNumber } from "class-validator";

export class RentCarDto {
  @IsNumber()
  carId: number;
  @IsNumber()
  customerId: number;
  @IsDateString()
  rentedAt: Date;
  @IsDateString()
  rentedUntil: Date;
}
