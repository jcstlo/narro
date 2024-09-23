"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Group, Burger, Skeleton } from "@mantine/core";
import { SpacesButtons } from "@/app/SpacesButtons";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return <AppShell
    header={{ height: 60 }}
    navbar={{
      width: 300,
      breakpoint: 'sm',
      collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
    }}
    padding="md"
  >
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
        <SpacesButtons/>
      </Group>
    </AppShell.Header>
    {children}
  </AppShell>
}