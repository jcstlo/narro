import { Space } from "@prisma/client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonBase } from "./lib/styles";

function getCurrentSpaceId(pathname: string) {
  const splitPath = pathname.split("/");
  const currentSpaceId = splitPath[2];
  return currentSpaceId;
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

  let allSpaceTailwindClasses = buttonBase;
  if (currentSpaceId === "all") {
    allSpaceTailwindClasses += " font-bold text-slate-700"
  }

  return (
    <div>
      {spacesArray.map((space) => {
        let tailwindClasses = buttonBase;
        if (currentSpaceId === space.id) {
          tailwindClasses += " font-bold text-slate-700"
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
          router.push(`all`);
        }}
      >
        all
      </button>
    </div>
  )
}
