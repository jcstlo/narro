import { Dispatch, SetStateAction } from "react"
import { ChangeEvent } from "react";

export function FilterTimeCreated({
  timeCreatedFilter,
  setTimeCreatedFilter,
}: {
  timeCreatedFilter: string,
  setTimeCreatedFilter: Dispatch<SetStateAction<string>>,
}) {
  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeCreatedFilter(e.target.value);
  }

  return (
    <div className="mt-5">
      <p className="font-bold">Time created:</p>
      <div className="flex">
        <input
          type="radio"
          name="filterTimeCreated"
          value="all"
          id="all"
          checked={timeCreatedFilter === "all"}
          onChange={onOptionChange}
        />
        <label htmlFor="all" className="ml-1">All</label>
      </div>
      <div className="flex">
        <input
          type="radio"
          name="filterTimeCreated"
          value="24h"
          id="24h"
          checked={timeCreatedFilter === "24h"}
          onChange={onOptionChange}
        />
        <label htmlFor="all" className="ml-1">Last 24 hours</label>
      </div>
      <div className="flex">
        <input
          type="radio"
          name="filterTimeCreated"
          value="7d"
          id="7d"
          checked={timeCreatedFilter === "7d"}
          onChange={onOptionChange}
        />
        <label htmlFor="all" className="ml-1">Last 7 days</label>
      </div>
      <div className="flex">
        <input
          type="radio"
          name="filterTimeCreated"
          value="30d"
          id="30d"
          checked={timeCreatedFilter === "30d"}
          onChange={onOptionChange}
        />
        <label htmlFor="all" className="ml-1">Last 30 days</label>
      </div>
    </div>
  )
}
