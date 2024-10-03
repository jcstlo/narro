"use client";

import { LinksList } from "@/app/LinksList";
import { AppShellMain, AppShellNavbar } from "@mantine/core";
import { useState, useEffect } from "react";
import { GroupsList } from "./GroupsList";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { createBookmark } from "./actions";
import { SortButtons } from "./SortButtons";
import { SearchQueryTitle } from "./SearchQueryTitle";
import { SearchQueryURL } from "./SearchQueryURL";

export interface currentGroupsState {
  groupsList: {
    id: string;
    name: string;
    createdAt: Date;
    spaceName: string;
    spaceId: string;
    checked: boolean;
  }[];
}

export interface GroupQueryData {
  id: string;
  name: string;
  createdAt: Date;
  spaceId: string;
  space: {
    name: string;
  }
}

export default function Page({
  params
}: {
  params: {
    spaceButtonId: string
  }
}) {
  const currentSpaceId = params.spaceButtonId;

  const defaultGroupsState: currentGroupsState = { groupsList: [] }
  const [currentGroups, setCurrentGroups] = useState(defaultGroupsState);
  const [refreshButton, setRefreshButton] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQueryTitle, setSearchQueryTitle] = useState("");
  const [searchQueryURL, setSearchQueryURL] = useState("");

  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);

  useEffect(() => {
    const obj = { currentSpaceId: currentSpaceId, };
    fetch("/api/query/groups", {
      method: "POST",
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data: GroupQueryData[]) => {
        const dataWithChecked = data.map((group) => {
          return {
            id: group.id,
            name: group.name,
            createdAt: group.createdAt,
            spaceName: group.space.name,
            spaceId: group.spaceId,
            checked: true,
          }
        })
        setCurrentGroups({ groupsList: dataWithChecked });
      })
  }, [refreshButton])

  const addBookmarkGroupsChecklist = currentGroups.groupsList.map((group) => {
    if (group.name === "Unsorted") {
      return <input type="hidden" name="unsortedGroupId" key={group.id} value={group.id} />
    }

    return (
      <div key={String(group.id)}>
        <input
          type="checkbox"
          id={String(group.id)}
          name="selectedGroups"
          value={String(group.id)}
        />
        <label htmlFor={String(group.id)} className="ml-2">{group.name}</label>
      </div>
    )
  })

  let addBookmarkButtonForm: JSX.Element = <></>;
  if (currentSpaceId !== "all") {
    addBookmarkButtonForm = (
      <>
        <button
          className="border border-black px-2 py-1 ml-2"
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
            className="border border-black px-2 py-1 ml-1 mb-2 mt-4"
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

  const refreshButtonJSX = (
    <button
      className="border border-black px-2 py-1 ml-2 my-2"
      onClick={() => {
        setRefreshButton(!refreshButton);
      }}
    >
      Refresh
    </button>
  )

  return (
    <div>
    <AppShellNavbar p="md">
      <SearchQueryTitle
        setSearchQueryTitle={setSearchQueryTitle}
      />
      <SearchQueryURL
        setSearchQueryURL={setSearchQueryURL}
      />
      <GroupsList
        setCurrentGroups={setCurrentGroups}
        currentGroups={currentGroups}
        currentSpaceId={currentSpaceId}
      />
      <SortButtons
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </AppShellNavbar>
    <AppShellMain>
      <div className="border-b">
        {addBookmarkButtonForm}
        {refreshButtonJSX}
      </div>
      <LinksList
        currentGroups={currentGroups}
        refreshButton={refreshButton}
        sortOrder={sortOrder}
        searchQueryTitle={searchQueryTitle}
        searchQueryURL={searchQueryURL}
      />
    </AppShellMain>
    </div>
  );
}