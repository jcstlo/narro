import { useRouter } from "next/navigation"
import { buttonBase } from "../lib/styles";

export function NewSpaceButton() {

  const router = useRouter();

  const buttonStyle = buttonBase + " hidden md:inline-block mr-3";

  return (
    <div>
      <button
        className={buttonStyle}
        onClick={() => {
          router.push("/create/space");
        }}
      >
        Create new space
      </button>
    </div>
  )
}
