"use client";

import { useRouter } from "next/navigation";
import { createSpace } from "./actions";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <form action={createSpace}>
        <label htmlFor="spacename">New space name</label>
        <input
          id="spacename"
          name="spacename"
          type="text"
          required
          className="block rounded-md border border-gray-400 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 mb-4 w-[400px]"
        />
        <button
          className="border border-black px-2 py-1 ml-1 mb-2"
          onClick={() => {
            router.push("/space/0");
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="border border-black px-2 py-1 ml-1 mb-2"
        >
          Create
        </button>
      </form>
    </div>
  )
}