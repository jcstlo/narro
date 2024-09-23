import { Space } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SpacesButtons() {
  const [spacesArray, setSpacesArray] = useState([] as Space[]);
  const router = useRouter();

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
          onClick={() => {
          router.push(`${space.id}`);
        }}
        >
          {space.name}
        </button>
      })}
      <button
        className="border border-black px-2 py-2 mx-1"
        onClick={() => {
          router.push(`0`);
        }}
      >
        all
      </button>
    </div>
  )
}