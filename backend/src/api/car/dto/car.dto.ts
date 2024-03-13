import { IsNotEmpty, IsString } from "class-validator";

export class CarDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  licence: string;
}
