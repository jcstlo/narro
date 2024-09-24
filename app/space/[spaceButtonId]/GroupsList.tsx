"use client";

import { Checkbox } from "@mantine/core"
import { useEffect, Dispatch, SetStateAction } from "react";
import { currentGroupsState } from "./page";
import { Group } from "@prisma/client";

export function GroupsList({
  currentSpaceId,
  currentGroups,
  setCurrentGroups,
}: {
  currentSpaceId: number,
  currentGroups: currentGroupsState,
  setCurrentGroups: Dispatch<SetStateAction<currentGroupsState>>,
}) {
  useEffect(() => {
    const obj = { currentSpaceId: currentSpaceId, };
    fetch("/api/query/groups", {
      method: "POST",
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data: Group[]) => {
        setCurrentGroups({ groupsList: data, allGroups: true });
      })
  }, [])

  return (
    <Checkbox.Group
      label="Groups"
    >
      {currentGroups.groupsList.map((group) => {
        return <Checkbox className="mb-1" value={String(group.id)} label={group.name} />
      })}
    </Checkbox.Group>
  )
}