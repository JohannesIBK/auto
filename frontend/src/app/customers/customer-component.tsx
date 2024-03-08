import { fetchCustomers } from "@/lib/requests";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Group, Table } from "@mantine/core";
import { Customer } from "@/types/customer";
import EditCustomerModal from "@/app/customers/edit-customer-modal";
import CreateCustomerModal from "@/app/customers/create-customer-modal";

const intl = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function CustomerComponent() {
  const [search, setSearch] = useState("");
  const [createCustomer, setCreateCustomer] = useState(false);
  const [editCustomer, setEditCustomer] = useState<null | Customer>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["customers", search],
    queryFn: () => fetchCustomers({ search }),
  });

  useEffect(() => {
    // TODO: Remove when mutation is implemented
    if (editCustomer === null || !createCustomer) {
      refetch();
    }
  }, [editCustomer, createCustomer]);

  if (isLoading || !data) {
    return "Loading ...";
  }

  if (isError) {
    return "Error";
  }

  return (
    <>
      <Group justify={"flex-end"}>
        <Button onClick={() => setCreateCustomer(true)}>Add new customer</Button>
      </Group>

      <Table width={"100%"}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Created at</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data!.map((customer) => (
            <Table.Tr
              key={customer.id}
              onClick={() => {
                setEditCustomer(customer);
              }}>
              <Table.Td>{customer.name}</Table.Td>
              <Table.Td>{intl.format(new Date(customer.createdAt))}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <EditCustomerModal open={editCustomer} setOpen={setEditCustomer} />
      <CreateCustomerModal open={createCustomer} setOpen={setCreateCustomer} />
    </>
  );
}

export default CustomerComponent;
