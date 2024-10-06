"use client";

import { Checkbox, Modal } from "@mantine/core"
import { Dispatch, SetStateAction, MouseEventHandler } from "react";
import { currentGroupsState } from "./page";
import { useDisclosure } from "@mantine/hooks";
import { createGroup } from "./actions";
import { notifications } from "@mantine/notifications";
import { buttonBase } from "@/app/lib/styles";
import { demoNotification } from "@/app/lib/demo";

export function GroupsList({
  currentGroups,
  setCurrentGroups,
  currentSpaceId
}: {
  currentGroups: currentGroupsState,
  setCurrentGroups: Dispatch<SetStateAction<currentGroupsState>>,
  currentSpaceId: string,
}) {

  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);

  function setCheckedAllGroups(checked: boolean) {
    const copyCurrentGroups = [...currentGroups.groupsList];
    const modified = copyCurrentGroups.map((group) => {
      return { ...group, checked: checked };
    })
    setCurrentGroups({ groupsList: modified });
  }

  function updateGroupsList(groupId: string, checked: boolean) {
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

    // prepend space name if in 'all' space
    if (currentSpaceId === "all") {
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

  const demoFlag = (process.env.NEXT_PUBLIC_DEMO === "true");
  let addNewGroupOnClickHandler: MouseEventHandler<HTMLButtonElement>;
  if (demoFlag) {
    addNewGroupOnClickHandler = demoNotification;
  } else {
    addNewGroupOnClickHandler = openModal;
  }


  let addNewGroupButtonForm: JSX.Element = <></>
  if (currentSpaceId !== "all") {
    addNewGroupButtonForm = (
      <div>
        <button
          className={buttonBase + " mt-2"}
          onClick={addNewGroupOnClickHandler}
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
              className={buttonBase}
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
    <div className="mt-3">
      <p className="font-bold mb-1">Groups:</p>
      <div className="flex">
        <button
        className={buttonBase + " ml-1 mb-3"}
          onClick={() => {
            setCheckedAllGroups(true);
          }}
        >
          Select all
        </button>
        <button
        className={buttonBase + " ml-1 mb-3"}
          onClick={() => {
            setCheckedAllGroups(false);
          }}
        >
          Select none
        </button>
      </div>
      {checkboxItems}
      {addNewGroupButtonForm}
    </div>
  )
}
