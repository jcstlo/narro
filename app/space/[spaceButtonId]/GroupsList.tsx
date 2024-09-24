"use client";

import { Skeleton } from "@mantine/core"
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
    <div>
      {currentGroups.groupsList.map((group) => {
        return <p>{group.name}</p>
      })}
    </div>
  )
}