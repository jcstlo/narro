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

  const demoFlag = (process.env.NEXT_PUBLIC_DEMO === "true");

  let demoNotice: JSX.Element = <></>
  let headerHeight = 60;

  if (demoFlag) {
    headerHeight = 85;
    demoNotice = (
      <div className="border border-red-400 bg-red-200 flex justify-center">
        <p className="font-medium text-gray-900">You are currently using the demo version of narro.</p>
        <a
          className="font-medium text-blue-600 ml-2 underline"
          href="https://github.com/jcstlo/narro"
          target="_blank"
          rel="noopener noreferrer"
        >
          [Github]
        </a>
      </div>
    )
  }

  return (
    <>
      <AppShell
        header={{ height: headerHeight }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
      >
        <AppShell.Header>
          {demoNotice}
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
    </>
  )}
