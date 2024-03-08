"use client";

import { List } from "@mantine/core";

export default function Home() {
  return (
    <main>
      <List>
        <List.Item>
          Click on the &quot;Cars&quot; link in the navigation bar to view, create, delete or rent out a car.
        </List.Item>
        <List.Item>
          Click on the &quot;Customers&quot; link in the navigation bar to view, create or delete customers.
        </List.Item>
      </List>
    </main>
  );
}
