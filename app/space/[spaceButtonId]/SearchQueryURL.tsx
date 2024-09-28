"use client";

import { Dispatch, SetStateAction } from "react"
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

export function SearchQueryURL({
  setSearchQueryURL
}: {
  setSearchQueryURL: Dispatch<SetStateAction<string>>,
}) {

  const handleSearch = useDebouncedCallback((term) => {
    setSearchQueryURL(term);
  }, 300);

  const onSearchQueryURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  }

  return (
    <>
      <input
        name="SearchQueryURL"
        type="text"
        placeholder="Search URL..."
        className="block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 mb-4"
        onChange={onSearchQueryURLChange}
      />
    </>
  )
}