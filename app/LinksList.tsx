"use client";

import { Link } from "@prisma/client";
import { useEffect, useState } from "react"

export function LinksList({
  currentSpaceId
}: {
  currentSpaceId: number
}) {
  const [linksArray, setLinksArray] = useState([] as Link[]);

  useEffect(() => {
      const obj = { currentSpaceId: currentSpaceId, };
      fetch("/api/query/links", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          setLinksArray(data);
        })
  }, [])

  return (
    <div>
        {linksArray.map((link) => {
          return <p key={link.id}>{link.id}</p>
        })}
    </div>
  )
}