import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./customer.entity";
import { RentCarEntity } from "./rent-car.entity";

@Entity("car")
export class CarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 15 })
  licence: string;

  @Column({ default: 0 })
  distance: number;

  @OneToOne(() => RentCarEntity, (rented) => rented.car)
  rentStatus: RentCarEntity;

  constructor(partial?: Partial<CarEntity>) {
    Object.assign(this, partial);
  }
}
