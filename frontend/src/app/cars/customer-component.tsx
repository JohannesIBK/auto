import { fetchCars } from "@/lib/requests";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Group, Table } from "@mantine/core";
import { Car } from "@/types/car";
import RentCarModal from "@/app/cars/rent-car-modal";
import ReturnCarModal from "@/app/cars/return-car-modal";
import CreateCarModal from "@/app/cars/create-car-modal";

function CustomerComponent() {
  const [search, setSearch] = useState("");
  const [createCar, setCreateCar] = useState(false);
  const [rentCar, setRentCar] = useState<null | Car>(null);
  const [returnCar, setReturnCar] = useState<null | Car>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["customer", search],
    queryFn: () => fetchCars({ search }),
  });

  useEffect(() => {
    // TODO: Remove when mutation is implemented
    if (rentCar === null || returnCar === null || !createCar) {
      refetch();
    }
  }, [rentCar, returnCar, createCar]);

  if (isLoading || !data) {
    return "Loading ...";
  }

  if (isError) {
    return "Error";
  }

  return (
    <>
      <Group justify={"flex-end"}>
        <Button onClick={() => setCreateCar(true)}>Add new car</Button>

        <span>
          {data!.filter((c) => c.rentStatus).length}/{data!.length} cars rented
        </span>
      </Group>

      <Table width={"100%"}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Licence</Table.Th>
            <Table.Th>Distance</Table.Th>
            <Table.Th>Rented</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data!.map((car) => (
            <Table.Tr
              key={car.id}
              onClick={() => {
                if (car.rentStatus) {
                  setReturnCar(car);
                } else {
                  setRentCar(car);
                }
              }}>
              <Table.Td>{car.name}</Table.Td>
              <Table.Td>{car.licence}</Table.Td>
              <Table.Td>{car.distance}</Table.Td>
              <Table.Td>{car.rentStatus ? "Yes" : "No"}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <RentCarModal open={rentCar} setOpen={setRentCar} />
      <ReturnCarModal open={returnCar} setOpen={setReturnCar} />
      <CreateCarModal open={createCar} setOpen={setCreateCar} />
    </>
  );
}

export default CustomerComponent;
