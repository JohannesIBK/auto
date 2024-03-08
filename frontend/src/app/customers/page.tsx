"use client";

import { Title } from "@mantine/core";

import CustomerComponent from "@/app/customers/customer-component";

function Page() {
  return (
    <>
      <Title>Customers</Title>
      <CustomerComponent />
    </>
  );
}

export default Page;
