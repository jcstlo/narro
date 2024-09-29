import { Dispatch, SetStateAction } from "react"
import { ChangeEvent } from "react";

export function SortButtons({
  sortOrder,
  setSortOrder
}: {
  sortOrder: string,
  setSortOrder: Dispatch<SetStateAction<string>>,
}) {

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortOrder(e.target.value);
  }

  return (
    <div className="mt-5">
      <p className="font-bold">Sort by:</p>
      <div className="flex">
        <input
          type="radio"
          name="sort"
          value="newest"
          id="newest"
          checked={sortOrder === "newest"}
          onChange={onOptionChange}
        />
        <label htmlFor="newest" className="ml-1">Newest</label>
      </div>
      <div className="flex">
        <input
          type="radio"
          name="sort"
          value="oldest"
          id="oldest"
          checked={sortOrder === "oldest"}
          onChange={onOptionChange}
        />
        <label htmlFor="oldest" className="ml-1">Oldest</label>
      </div>
      <div className="flex">
        <input
          type="radio"
          name="sort"
          value="atoz"
          id="atoz"
          checked={sortOrder === "atoz"}
          onChange={onOptionChange}
        />
        <label htmlFor="atoz" className="ml-1">A - Z</label>
      </div>
      <div className="flex">
        <input
          type="radio"
          name="sort"
          value="ztoa"
          id="ztoa"
          checked={sortOrder === "ztoa"}
          onChange={onOptionChange}
        />
        <label htmlFor="ztoa" className="ml-1">Z - A</label>
      </div>
    </div>
  )
}