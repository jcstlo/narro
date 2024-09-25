"use client";

import { LinksList } from "@/app/LinksList";
import { AppShellMain, AppShellNavbar } from "@mantine/core";
import { useState, useEffect } from "react";
import { GroupsList } from "./GroupsList";
import { Group } from "@prisma/client";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { createBookmark } from "./actions";

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

  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);

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

  const addBookmarkGroupsChecklist = currentGroups.groupsList.map((group) => {
    return (
      <div>
        <input type="checkbox" id={String(group.id)} name="selectedGroups" value={String(group.id)}/>
        <label htmlFor={String(group.id)}>{group.name}</label>
      </div>
    )
  })

  return (
    <div>
    <AppShellNavbar p="md">
      <GroupsList
        setCurrentGroups={setCurrentGroups}
        currentGroups={currentGroups}
      />
    </AppShellNavbar>
    <AppShellMain>
      <div className="border-b">
        <button
          className="border border-black px-2 py-1"
          onClick={openModal}
        >
          Add new bookmark
        </button>
        <Modal
          opened={openedModal}
          onClose={closeModal}
          title="Add new bookmark"
          centered
        >
          <form action={createBookmark}>
            <label htmlFor="linkname">Bookmark name</label>
            <input
              id="linkname"
              name="linkname"
              type="text"
              placeholder="Describe this link..."
              required
              className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 mb-4"
            />
            <label htmlFor="linkurl">Bookmark URL</label>
            <input
              id="linkurl"
              name="linkurl"
              type="text"
              placeholder="https://example.com"
              required
              className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 mb-4"
            />
            {addBookmarkGroupsChecklist}
            <input type="hidden" name="spaceId" value={currentSpaceId}/>
            <button
            type="submit"
            className="border border-black px-2 py-1 ml-1 mb-2"
            onClick={closeModal}
            >
              Create
            </button>
          </form>
        </Modal>
      </div>
      <LinksList currentGroups={currentGroups}/>
    </AppShellMain>
    </div>
  );
}