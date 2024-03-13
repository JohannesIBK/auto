import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Put,
  Query,
} from "@nestjs/common";
import { CarService } from "@/services/car/car.service";
import { CarEntity } from "@/entity";
import { CarDto } from "./dto/car.dto";
import { RentCarService } from "@/services/rent-car/rent-car.service";

@Controller("car")
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly rentCarService: RentCarService,
  ) {}

  @Get("/")
  async getCars(
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("search") search?: string,
    @Query("rented", new ParseBoolPipe({ optional: true })) rented?: boolean,
  ) {
    return this.carService.find({ page: page ?? 0, search, rented });
  }

  @Put("/")
  @HttpCode(201)
  async createCar(@Body() payload: CarDto) {
    const car = new CarEntity();
    console.log(payload);

    car.name = payload.name;
    car.licence = payload.licence;

    return this.carService.save(car);
  }

  @Delete("/:id")
  @HttpCode(204)
  async deleteCar(@Param("id", ParseIntPipe) id: number) {
    const rentedCar = await this.rentCarService.findRentedCar(id);

    if (rentedCar) {
      throw new ConflictException("Car is currently rented.");
    }

    await this.carService.deleteById(id);
  }
}
