"use client";

import { Link } from "@prisma/client";
import { useEffect, useState } from "react"
import { currentGroupsState } from "./space/[spaceButtonId]/page";

export function LinksList({
  currentGroups,
  refreshButton,
  sortOrder,
  searchQueryTitle,
  searchQueryURL,
}: {
  currentGroups: currentGroupsState,
  refreshButton: boolean,
  sortOrder: string,
  searchQueryTitle: string,
  searchQueryURL: string,
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
        searchQueryURL: searchQueryURL,
      };
      fetch("/api/query/links", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          setLinksArray(data);
        })
  }, [currentGroups, refreshButton, sortOrder, searchQueryTitle, searchQueryURL])

  const linkRenderedRows = linksArray.map((link) => {
    return (
      <div key={link.id} className="py-3 border-y-slate-300 border-b pl-3">
        <p className="font-semibold">{link.title}</p>
        <p>{link.url}</p>
      </div>
    )
  })

  return (
    <div>
        {linkRenderedRows}
    </div>
  )
}