import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from "@nestjs/common";
import { CustomerService } from "@/services/customer/customer.service";
import { CustomerEntity } from "@/entity";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { RentCarService } from "@/services/rent-car/rent-car.service";

@Controller("customer")
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly rentService: RentCarService,
  ) {}

  @Put("/")
  @HttpCode(201)
  async create(@Body() payload: CreateCustomerDto) {
    const customer = new CustomerEntity(payload);

    return this.customerService.save(customer);
  }

  @Get("/")
  async list(@Query("page", new ParseIntPipe({ optional: true })) page?: number, @Query("search") search?: string) {
    return this.customerService.find({ page: page ?? 0, search });
  }

  @Get("/:id")
  async findById(@Param("id", ParseIntPipe) id: number) {
    const customer = await this.customerService.findById(id);

    if (!customer) {
      throw new NotFoundException("Customer not found");
    }

    return customer;
  }

  @Delete("/:id")
  @HttpCode(204)
  async delete(@Param("id", ParseIntPipe) id: number) {
    const rentedCar = await this.rentService.findRentedCarsByCustomerId(id);

    if (rentedCar.length > 0) {
      throw new ConflictException("Customer has rented cars");
    }

    await this.customerService.deleteById(id);
  }
}
