import { Space } from "@prisma/client";
import { useEffect, useState } from "react";

export function SpacesButtons() {
  const [spacesArray, setSpacesArray] = useState([] as Space[]);

  useEffect(() => {
    fetch("/api/query/spaces", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setSpacesArray(data);
      })
}, [])

  return (
    <div>
      {spacesArray.map((space) => {
        return <button 
          className="border border-black px-2 py-2 mx-1"
        >
          {space.name}
        </button>
      })}
    </div>
  )
}