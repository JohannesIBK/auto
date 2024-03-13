import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { CarEntity, CustomerEntity, RentCarEntity } from "@/entity";
import { RentCarService } from "@/services/rent-car/rent-car.service";

@Module({
  imports: [TypeOrmModule.forFeature([RentCarEntity, CustomerEntity, CarEntity])],
  providers: [RentCarService],
  exports: [RentCarService],
})
export class RentCarServiceModule {}
