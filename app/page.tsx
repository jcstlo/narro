"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <button
      className="border border-black px-2 py-2 mx-1"
      onClick={() => {
        router.push("/space/all");
      }}
    >
    {"Go to \"all\" space"}
    </button>
  );
}
