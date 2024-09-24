"use client";

import { Checkbox } from "@mantine/core"
import { Dispatch, SetStateAction } from "react";
import { currentGroupsState } from "./page";

export function GroupsList({
  currentGroups,
  setCurrentGroups
}: {
  currentGroups: currentGroupsState,
  setCurrentGroups: Dispatch<SetStateAction<currentGroupsState>>,
}) {

  function updateGroupsList(groupId: number, checked: boolean) {
    const copyCurrentGroups = [...currentGroups.groupsList];
    for (let i = 0; i < copyCurrentGroups.length; i++) {
      if (groupId === copyCurrentGroups[i].id) {
        copyCurrentGroups[i].checked = checked;
        break;
      }
    }
    setCurrentGroups({ groupsList: copyCurrentGroups });
    console.log(copyCurrentGroups);
  }

  const checkboxItems = currentGroups.groupsList.map((group) => {
    return <Checkbox
      className="mb-1"
      value={String(group.id)}
      label={group.name}
      onChange={(event) => {
        updateGroupsList(group.id, event.currentTarget.checked);
      }}
    />
  })

  return (
    <Checkbox.Group
      label="Groups"
    >
      {checkboxItems}
    </Checkbox.Group>
  )
}