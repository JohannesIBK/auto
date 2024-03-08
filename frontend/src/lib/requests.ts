import axios from "axios";
import { API_URL } from "@/lib/env";
import { Car } from "@/types/car";
import { Customer } from "@/types/customer";

export async function fetchCars(params?: { search?: string; rented?: boolean }) {
  if (params) {
    if (params.rented === undefined) delete params.rented;
    if (params.search === "") delete params.search;

    if (params && Object.keys(params).length === 0) params = undefined;
  }

  const request = await axios.get<Car[]>(`${API_URL}/car`, { params });

  return request.data;
}

export async function fetchUsers(params?: { search?: string }) {
  if (params) {
    if (params.search === "") delete params.search;

    if (params && Object.keys(params).length === 0) params = undefined;
  }

  const request = await axios.get<Customer[]>(`${API_URL}/customer`, { params });

  return request.data;
}

export async function rentCar({
  carId,
  customerId,
  rentedAt,
  rentedUntil,
}: {
  carId: number;
  customerId: number;
  rentedAt: Date;
  rentedUntil: Date;
}) {
  return await axios.post<void>(`${API_URL}/rent-car`, {
    carId,
    customerId,
    rentedAt,
    rentedUntil,
  });
}

export async function returnCar({ carId, distance }: { carId: number; distance: number }) {
  return await axios.delete<void>(`${API_URL}/rent-car/${carId}`, {
    params: { distance },
  });
}

export async function createCar(payload: { name: string; licence: string }) {
  return await axios.put<Car>(`${API_URL}/car`, payload);
}

export async function deleteCar(id: number) {
  return await axios.delete<void>(`${API_URL}/car/${id}`);
}

export async function createCustomer(payload: { name: string }) {
  return await axios.put<Car>(`${API_URL}/customer`, payload);
}

export async function fetchCustomers(params?: { search?: string }) {
  if (params) {
    if (params.search === "") delete params.search;

    if (params && Object.keys(params).length === 0) params = undefined;
  }

  const request = await axios.get<Customer[]>(`${API_URL}/customer`, { params });

  return request.data;
}

export async function deleteCustomer(id: number) {
  return await axios.delete<void>(`${API_URL}/customer/${id}`);
}
