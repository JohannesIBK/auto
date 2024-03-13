import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, FindManyOptions, IsNull, Like, Not, Repository } from "typeorm";

import { CarEntity, RentCarEntity } from "@/entity";

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity) private readonly carRepository: Repository<CarEntity>,
    @InjectRepository(RentCarEntity) private readonly rentRepository: Repository<RentCarEntity>,
  ) {}

  findById(id: number): Promise<CarEntity | null> {
    return this.carRepository.findOne({ where: { id }, relations: ["customer"] });
  }

  save(customer: CarEntity): Promise<CarEntity> {
    return this.carRepository.save(customer);
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.carRepository.delete({ id });
  }

  find({ page, search, rented }: { page: number; search?: string; rented?: boolean }): Promise<CarEntity[]> {
    let where = undefined;

    if (rented !== undefined || search !== undefined) {
      where = {};

      if (rented !== undefined) {
        where = { rentStatus: { customer: rented ? Not(IsNull()) : IsNull() } };
      }

      if (search !== undefined) {
        where = { name: Like(`%${search}%`) };
      }
    }
    const findOptions: FindManyOptions<CarEntity> = {
      skip: page ? page * 50 : 0,
      take: 50,
      where,
      relations: {
        rentStatus: {
          customer: true,
        },
      },
    };

    return this.carRepository.find(findOptions);
  }
}
