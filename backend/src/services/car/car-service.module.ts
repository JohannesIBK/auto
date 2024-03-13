import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { CarEntity, RentCarEntity } from "@/entity";
import { CarService } from "./car.service";

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity, RentCarEntity])],
  providers: [CarService],
  exports: [CarService],
})
export class CarServiceModule {}
