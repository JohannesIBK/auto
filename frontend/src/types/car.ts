import { RentStatus } from "./rent-status";

export interface Car {
  id: number;
  name: string;
  licence: string;
  distance: number;
  rentStatus: RentStatus | null;
}
