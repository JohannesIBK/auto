"use client";

import "@mantine/core/styles.css";
import { AppShell, Button, createTheme, Group, MantineProvider } from "@mantine/core";
import React from "react";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  cursorType: "pointer",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = React.useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          gcTime: 1000 * 60 * 10,
        },
      },
    });
  });

  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme} forceColorScheme={"light"}>
          <QueryClientProvider client={queryClient}>
            <AppShell header={{ height: 60 }} padding="md">
              <AppShell.Header
                component={Group}
                // @ts-ignore
                justify="center">
                <Group gap={"md"}>
                  <Button component={Link} href={"/"}>
                    Home
                  </Button>
                  <Button component={Link} href={"/cars"}>
                    Car
                  </Button>
                  <Button component={Link} href={"/customers"}>
                    Customer
                  </Button>
                </Group>
              </AppShell.Header>

              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          </QueryClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
