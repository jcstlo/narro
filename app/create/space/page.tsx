"use client";

import { useRouter } from "next/navigation";
import { createSpace } from "./actions";
import { notifications } from "@mantine/notifications";
import { buttonBase } from "@/app/lib/styles";
import { demoNotification } from "@/app/lib/demo";

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

  const demoFlag = (process.env.NEXT_PUBLIC_DEMO === "true");
  let createButton: JSX.Element = (
    <button
      type="submit"
      className={buttonBase}
    >
      Create
    </button>
  )
  if (demoFlag) {
    createButton = (
      <button
        type="button"
        className={buttonBase}
        onClick={demoNotification}
      >
        Create
      </button>
    )
  }

  return (
    <div className="ml-4 mt-3">
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
          className={buttonBase}
          onClick={() => {
            router.push("/space/all");
          }}
        >
          Cancel
        </button>
        {createButton}
      </form>
    </div>
  )
}
