import { Link } from "@prisma/client";
import { useEffect, useState } from "react"

export function LinksList({
  test
}: {
  test: boolean
}) {
  const [linksArray, setLinksArray] = useState([] as Link[]);

  useEffect(() => {
      const obj = { testJSONValue: test, };
      fetch("/api/query/links", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          setLinksArray(data);
        })
  }, [test])

  return (
    <div>
        {linksArray.map((link) => {
          return <p key={link.id}>{link.id}</p>
        })}
    </div>
  )
}