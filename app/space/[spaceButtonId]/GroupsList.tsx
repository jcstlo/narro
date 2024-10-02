"use client";

import { Checkbox, Modal } from "@mantine/core"
import { Dispatch, SetStateAction } from "react";
import { currentGroupsState } from "./page";
import { useDisclosure } from "@mantine/hooks";
import { createGroup } from "./actions";
import { notifications } from "@mantine/notifications";

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
    let groupLabel = group.name;

    // format unsorted group name before showing it to user
    if (group.name === `_Unsorted_ ${group.spaceName}`) {
      groupLabel = "Unsorted";
    }

    // prepend space name if in 'all' space
    if (currentSpaceId === 0) {
      groupLabel = `${group.spaceName}: ${groupLabel}`
    }

    return <Checkbox
      className="mb-1"
      key={String(group.id)}
      value={String(group.id)}
      label={groupLabel}
      checked={group.checked}
      onChange={(event) => {
        updateGroupsList(group.id, event.currentTarget.checked);
      }}
    />
  })

  async function createGroupWrapper(formData: FormData) {
    const result = await createGroup(formData);
    if (result?.error) {
      notifications.show({
        title: 'Error',
        message: result.error,
        color: 'red',
        position: 'top-center',
      })
    }
  }

  let addNewGroupButtonForm: JSX.Element = <></>
  if (currentSpaceId !== 0) {
    addNewGroupButtonForm = (
      <div>
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
          <form action={createGroupWrapper}>
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
      </div>
    )
  }

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
      {addNewGroupButtonForm}
    </>
  )
}