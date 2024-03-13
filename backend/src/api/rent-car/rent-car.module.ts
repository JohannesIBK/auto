import { Module } from "@nestjs/common";
import { RentCarController } from "./rent-car.controller";
import { RentCarServiceModule } from "@/services/rent-car/rent-car-service.module";
import { CarServiceModule } from "@/services/car/car-service.module";

@Module({
  imports: [RentCarServiceModule, CarServiceModule],
  controllers: [RentCarController],
})
export class RentCarModule {}
