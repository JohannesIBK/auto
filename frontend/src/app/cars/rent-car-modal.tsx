import { Button, Modal, Select } from "@mantine/core";
import { UseState } from "@/types/react";
import { Car } from "@/types/car";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { deleteCar, fetchUsers, rentCar } from "@/lib/requests";

interface Props {
  open: Car | null;
  setOpen: UseState<Car | null>;
}

function RentCarModal({ open, setOpen }: Props) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);

  const { data } = useQuery({
    queryKey: ["users", search],
    queryFn: () => fetchUsers({ search }),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (data) setUsers(data.map((user) => ({ value: user.id.toString(), label: user.name })));
  }, [data]);

  useEffect(() => {
    if (open) {
      setSearch(open.rentStatus?.customer?.name || "");
    }
  }, [open]);

  return (
    <Modal opened={!!open} onClose={() => setOpen(null)} title={"Rent Car"}>
      <Select
        placeholder={"Type to search"}
        nothingFoundMessage={"No customers found"}
        data={users}
        searchable
        searchValue={search}
        onSearchChange={setSearch}
        onChange={(value) => {
          if (!value) return;

          // TODO: Use mutation
          rentCar({ carId: open!.id, customerId: parseInt(value), rentedAt: new Date(), rentedUntil: new Date() }).then(
            () => {
              setOpen(null);
            },
          );
        }}
      />

      <Button
        color={"red"}
        onClick={() => {
          // TODO: Use mutation
          deleteCar(open!.id).then(() => {
            setOpen(null);
          });
        }}>
        Delete Car
      </Button>
    </Modal>
  );
}

export default RentCarModal;
