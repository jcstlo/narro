export function FilterTimeCreated() {

  return (
    <div className="mt-5">
      <p className="font-bold">Time created:</p>
      <div className="flex">
        <input
          type="radio"
          name="filterTimeCreated"
          value="all"
          id="all"
        />
        <label htmlFor="all" className="ml-1">All</label>
      </div>
      <div className="flex">
        <input
          type="radio"
          name="filterTimeCreated"
          value="24h"
          id="24h"
        />
        <label htmlFor="all" className="ml-1">Last 24 hours</label>
      </div>
      <div className="flex">
        <input
          type="radio"
          name="filterTimeCreated"
          value="7d"
          id="7d"
        />
        <label htmlFor="all" className="ml-1">Last 7 days</label>
      </div>
      <div className="flex">
        <input
          type="radio"
          name="filterTimeCreated"
          value="30d"
          id="30d"
        />
        <label htmlFor="all" className="ml-1">Last 30 days</label>
      </div>
    </div>
  )
}
