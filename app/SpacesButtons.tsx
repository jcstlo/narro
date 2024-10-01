import { Space } from "@prisma/client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function getCurrentSpaceId(pathname: string) {
  const splitPath = pathname.split("/");
  const currentSpaceId = splitPath[2];
  return Number(currentSpaceId);
}

export function SpacesButtons() {
  const [spacesArray, setSpacesArray] = useState([] as Space[]);
  const router = useRouter();
  const pathname = usePathname();
  const currentSpaceId = getCurrentSpaceId(pathname);

  useEffect(() => {
    fetch("/api/query/spaces", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setSpacesArray(data);
      })
  }, [])

  let allSpaceTailwindClasses = "border border-black px-2 py-2 mx-1"
  if (currentSpaceId === 0) {
    allSpaceTailwindClasses += " underline font-bold"
  }

  return (
    <div>
      {spacesArray.map((space) => {
        let tailwindClasses = "border border-black px-2 py-2 mx-1"
        if (currentSpaceId === space.id) {
          tailwindClasses += " underline font-bold"
        }

        return <button
          key={space.id}
          className={tailwindClasses}
          onClick={() => {
          router.push(`${space.id}`);
        }}
        >
          {space.name}
        </button>
      })}
      <button
        className={allSpaceTailwindClasses}
        onClick={() => {
          router.push(`0`);
        }}
      >
        all
      </button>
    </div>
  )
}