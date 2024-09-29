import { useRouter } from "next/navigation"

export function NewSpaceButton() {

  const router = useRouter();

  return (
    <div>
      <button
        className="border border-black px-2 py-2 mx-1 hidden md:inline-block"
        onClick={() => {
          router.push("/create/space");
        }}
      >
        Create new space
      </button>
    </div>
  )
}