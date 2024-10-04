"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Group, Burger } from "@mantine/core";
import { SpacesButtons } from "@/app/SpacesButtons";
import { NewSpaceButton } from "./NewSpaceButton";

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
  >
    <AppShell.Header>
      <div className="flex justify-between items-center py-3">
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
        </Group>
        <SpacesButtons/>
        <NewSpaceButton/>
      </div>
    </AppShell.Header>
    {children}
  </AppShell>
}
