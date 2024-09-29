"use client";

import { Checkbox, Modal } from "@mantine/core"
import { Dispatch, SetStateAction } from "react";
import { currentGroupsState } from "./page";
import { useDisclosure } from "@mantine/hooks";
import { createGroup } from "./actions";

export function GroupsList({
  currentGroups,
  setCurrentGroups,
  currentSpaceId
}: {
  currentGroups: currentGroupsState,
  setCurrentGroups: Dispatch<SetStateAction<currentGroupsState>>,
  currentSpaceId: number,
}) {

  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);

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
      <div className="flex mt-5">
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
      <button
        className="border border-black w-[150px] py-1 ml-1 mt-2"
        onClick={openModal}
      >
        Create new group
      </button>
      <Modal
        opened={openedModal}
        onClose={closeModal}
        title="Add new group"
        centered
      >
        <form action={createGroup}>
          <label htmlFor="groupname">Group name</label>
          <input type="hidden" name="spaceId" value={currentSpaceId}/>
          <input
            id="groupname"
            name="groupname"
            type="text"
            required
            className="block w-full rounded-md border border-gray-300 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 mb-4"
          />
          <button
            type="submit"
            className="border border-black px-2 py-1 ml-1 mb-2"
            onClick={() => {
              closeModal();
            }}
          >
            Create  
          </button>
        </form>
      </Modal>
    </>
  )
}