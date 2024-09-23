"use client";

import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();

  return (
    <button
      className="border border-black px-2 py-2 mx-1"
      onClick={() => {
        router.push("/space/0");
      }}
    >
      Go to "all" space
    </button>
  );
}
