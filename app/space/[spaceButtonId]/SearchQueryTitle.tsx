"use client";

import { Dispatch, SetStateAction } from "react"
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export function SearchQueryTitle({
  setSearchQueryTitle
}: {
  setSearchQueryTitle: Dispatch<SetStateAction<string>>,
}) {

  const handleSearch = useDebouncedCallback((term) => {
    setSearchQueryTitle(term);
  }, 300);

  const onSearchQueryTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  }

  return (
    <>
      <p className="font-bold mb-1">Search:</p>
      <input
        name="searchQueryTitle"
        type="text"
        placeholder="Search title..."
        className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 mb-2"
        onChange={onSearchQueryTitleChange}
      />
    </>
  )
}
