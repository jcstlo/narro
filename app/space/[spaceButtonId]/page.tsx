"use client";

import { LinksList } from "@/app/LinksList";
import { AppShellMain, AppShellNavbar } from "@mantine/core";
import { useState, useEffect } from "react";
import { GroupsList } from "./GroupsList";
import { Group } from "@prisma/client";

export interface currentGroupsState {
  groupsList: {
    id: number;
    name: string;
    createdAt: Date;
    spaceId: number;
    checked: boolean;
  }[];
}

export default function Page({
  params
}: {
  params: {
    spaceButtonId: string
  }
}) {
  const currentSpaceId = Number(params.spaceButtonId);

  const defaultGroupsState: currentGroupsState = { groupsList: [] }
  const [currentGroups, setCurrentGroups] = useState(defaultGroupsState);

  useEffect(() => {
    const obj = { currentSpaceId: currentSpaceId, };
    fetch("/api/query/groups", {
      method: "POST",
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data: Group[]) => {
        const dataWithChecked = data.map((group) => {
          return {
            id: group.id,
            name: group.name,
            createdAt: group.createdAt,
            spaceId: group.spaceId,
            checked: false,
          }
        })
        setCurrentGroups({ groupsList: dataWithChecked });
      })
  }, [])

  return (
    <div>
    <AppShellNavbar p="md">
      <GroupsList
        setCurrentGroups={setCurrentGroups}
        currentGroups={currentGroups}
      />
    </AppShellNavbar>
    <AppShellMain>
      <LinksList currentSpaceId={currentSpaceId}/>
    </AppShellMain>
    </div>
  );
}