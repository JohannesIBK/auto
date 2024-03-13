import { Module } from "@nestjs/common";
import { CarController } from "./car.controller";
import { CarServiceModule } from "@/services/car/car-service.module";
import { RentCarServiceModule } from "@/services/rent-car/rent-car-service.module";

@Module({
  imports: [CarServiceModule, RentCarServiceModule],
  controllers: [CarController],
})
export class CarModule {}
