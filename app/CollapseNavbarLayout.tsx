"use client";

import { AppShell, Group, Burger, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function CollapseNavbarLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(true);
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
      </Group>
    </AppShell.Header>
    <AppShell.Navbar p="md">
      Navbar
      {Array(15)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} h={28} mt="sm" animate={false} />
        ))}
    </AppShell.Navbar>
    <AppShell.Main>Main</AppShell.Main>
  </AppShell>
}