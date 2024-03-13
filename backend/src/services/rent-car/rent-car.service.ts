import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

import { CustomerEntity, RentCarEntity } from "@/entity";

@Injectable()
export class RentCarService {
  constructor(@InjectRepository(RentCarEntity) private readonly rentedRepository: Repository<RentCarEntity>) {}

  findRentedCarsByCustomerId(customerId: number): Promise<RentCarEntity[]> {
    return this.rentedRepository.find({
      where: { customer: new CustomerEntity({ id: customerId }) },
      relations: ["car"],
    });
  }

  findRentedCar(id: number): Promise<RentCarEntity | null> {
    return this.rentedRepository.findOne({ where: { car: { id } }, relations: ["car", "customer"] });
  }

  save(rentedCar: RentCarEntity): Promise<RentCarEntity> {
    return this.rentedRepository.save(rentedCar);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.rentedRepository.delete(id);
  }
}
