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

  function setCheckedAllGroups(checked: boolean) {
    const copyCurrentGroups = [...currentGroups.groupsList];
    const modified = copyCurrentGroups.map((group) => {
      return { ...group, checked: checked };
    })
    setCurrentGroups({ groupsList: modified });
  }

  function updateGroupsList(groupId: number, checked: boolean) {
    const copyCurrentGroups = [...currentGroups.groupsList];
    for (let i = 0; i < copyCurrentGroups.length; i++) {
      if (groupId === copyCurrentGroups[i].id) {
        copyCurrentGroups[i].checked = checked;
        break;
      }
    }
    setCurrentGroups({ groupsList: copyCurrentGroups });
  }

  const checkboxItems = currentGroups.groupsList.map((group) => {
    return <Checkbox
      className="mb-1"
      key={String(group.id)}
      value={String(group.id)}
      label={group.name}
      checked={group.checked}
      onChange={(event) => {
        updateGroupsList(group.id, event.currentTarget.checked);
      }}
    />
  })

  return (
    <>
      <div className="flex">
        <button
        className="border border-black px-2 py-1 ml-1 mb-2"
          onClick={() => {
            setCheckedAllGroups(true);
          }}
        >
          Select all
        </button>
        <button
        className="border border-black px-2 py-1 ml-1 mb-2"
          onClick={() => {
            setCheckedAllGroups(false);
          }}
        >
          Select none
        </button>
      </div>
      {checkboxItems}
    </>
  )
}