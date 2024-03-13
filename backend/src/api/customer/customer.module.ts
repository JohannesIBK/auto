import { Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerServiceModule } from "@/services/customer/customer-service.module";
import { RentCarServiceModule } from "@/services/rent-car/rent-car-service.module";

@Module({
  imports: [CustomerServiceModule, RentCarServiceModule],
  controllers: [CustomerController],
})
export class CustomerModule {}
