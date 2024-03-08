import { Customer } from "./customer";

export interface RentStatus {
  id: number;
  rentedAt: string;
  rentedUntil: string;
  customer: Customer
}
