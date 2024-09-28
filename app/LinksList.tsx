"use client";

import { Link } from "@prisma/client";
import { useEffect, useState } from "react"
import { currentGroupsState } from "./space/[spaceButtonId]/page";

export function LinksList({
  currentGroups,
  refreshButton,
  sortOrder,
  searchQueryTitle
}: {
  currentGroups: currentGroupsState,
  refreshButton: boolean,
  sortOrder: string,
  searchQueryTitle: string,
}) {
  const [linksArray, setLinksArray] = useState([] as Link[]);

  const groupIds: number[] = [];
  for (let i = 0; i < currentGroups.groupsList.length; i++) {
    if (currentGroups.groupsList[i].checked) {
      groupIds.push(currentGroups.groupsList[i].id);
    }
  }

  useEffect(() => {
      const obj = {
        groups: groupIds,
        sortOrder: sortOrder,
        searchQueryTitle: searchQueryTitle,
      };
      fetch("/api/query/links", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          setLinksArray(data);
        })
  }, [currentGroups, refreshButton, sortOrder, searchQueryTitle])

  return (
    <div>
        {linksArray.map((link) => {
          return <p key={link.id}>{link.title}</p>
        })}
    </div>
  )
}