"use client";

import { useRouter } from "next/navigation";
import { createSpace } from "./actions";
import { notifications } from "@mantine/notifications";

export default function Page() {
  const router = useRouter();

  async function createSpaceWrapper(formData: FormData) {
    const result = await createSpace(formData);
    if (result?.error) {
      notifications.show({
        title: 'Error',
        message: result.error,
        color: 'red',
        position: 'top-center',
      })
    } else {
      router.push("/space/all");
    }
  }

  return (
    <div>
      <form action={createSpaceWrapper}>
        <label htmlFor="spacename">New space name</label>
        <input
          id="spacename"
          name="spacename"
          type="text"
          required
          className="block rounded-md border border-gray-400 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 mb-4 w-[400px]"
        />
        <button
          type="button"
          className="border border-black px-2 py-1 ml-1 mb-2"
          onClick={() => {
            router.push("/space/all");
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