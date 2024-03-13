import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity } from "@/entity";
import { DeleteResult, Like, Repository } from "typeorm";

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>) {}

  findById(id: number): Promise<CustomerEntity | null> {
    return this.customerRepository.findOneBy({ id });
  }

  find({ page, search }: { page: number; search?: string }): Promise<CustomerEntity[]> {
    return this.customerRepository.find(
      search
        ? {
            where: {
              name: Like(`%${search}%`),
            },
            skip: page ? page * 50 : 0,
            take: 50,
          }
        : {
            skip: page ? page * 50 : 0,
            take: 50,
          },
    );
  }

  save(customer: CustomerEntity): Promise<CustomerEntity> {
    return this.customerRepository.save(customer);
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.customerRepository.delete({ id });
  }
}
