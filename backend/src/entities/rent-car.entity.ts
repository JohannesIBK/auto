import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Column, OneToOne } from "typeorm";
import { CarEntity } from "./car.entity";
import { CustomerEntity } from "./customer.entity";

@Entity("rented_car")
export class RentCarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "rented_at" })
  rentedAt: Date;

  @Column({ name: "rented_until" })
  rentedUntil: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.id)
  @JoinColumn({ name: "customer_id" })
  customer: CustomerEntity;

  @OneToOne(() => CarEntity, (car) => car.id)
  @JoinColumn({ name: "car_id" })
  car: CarEntity;

  constructor(partial: Partial<RentCarEntity>) {
    Object.assign(this, partial);
  }
}
