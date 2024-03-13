import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { RentCarService } from "@/services/rent-car/rent-car.service";
import { RentCarDto } from "./dto/rent-car.dto";
import { CarEntity, CustomerEntity, RentCarEntity } from "@/entity";
import { CarService } from "@/services/car/car.service";

@Controller("rent-car")
export class RentCarController {
  constructor(
    private readonly rentedService: RentCarService,
    private readonly carService: CarService,
  ) {}

  @Post("/")
  async rentCar(@Body() payload: RentCarDto) {
    const rentedCar = new RentCarEntity({ rentedUntil: payload.rentedUntil, rentedAt: payload.rentedAt });
    rentedCar.car = new CarEntity({ id: payload.carId });
    rentedCar.customer = new CustomerEntity({ id: payload.customerId });

    return this.rentedService.save(rentedCar);
  }

  @Delete("/:id")
  @HttpCode(204)
  async returnCar(
    @Param("id", new ParseIntPipe()) id: number,
    @Query("distance", new ParseIntPipe()) distance: number,
  ) {
    const rentedCar = await this.rentedService.findRentedCar(id);
    if (!rentedCar) {
      throw new NotFoundException("Rental status not found.");
    }

    const car = rentedCar.car;
    car.distance += distance;

    await this.carService.save(car);
    await this.rentedService.delete(rentedCar.id);
  }
}
