import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer")
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  constructor(partial?: Partial<CustomerEntity>) {
    Object.assign(this, partial);
  }
}
