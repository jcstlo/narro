"use client";

import { LinksList } from "@/app/LinksList";
import { AppShellMain, AppShellNavbar } from "@mantine/core";
import { useState } from "react";
import { GroupsList } from "./GroupsList";
import { Group } from "@prisma/client";

export interface currentGroupsState {
  allGroups: boolean;
  groupsList: Group[];
}

export default function Page({
  params
}: {
  params: {
    spaceButtonId: string
  }
}) {
  const currentSpaceId = Number(params.spaceButtonId);

  const defaultGroupsState: currentGroupsState = {
    allGroups: true,
    groupsList: []
  }
  const [currentGroups, setCurrentGroups] = useState(defaultGroupsState);

  return (
    <div>
    <AppShellNavbar p="md">
      <GroupsList
        currentSpaceId={currentSpaceId}
        currentGroups={currentGroups}
        setCurrentGroups={setCurrentGroups}
      />
    </AppShellNavbar>
    <AppShellMain>
      <LinksList currentSpaceId={currentSpaceId}/>
    </AppShellMain>
    </div>
  );
}