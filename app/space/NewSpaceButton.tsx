import { useRouter } from "next/navigation"
import { buttonBase } from "../lib/styles";
import { MouseEventHandler } from "react";
import { demoNotification } from "../lib/demo";

export function NewSpaceButton() {

  const router = useRouter();

  const buttonStyle = buttonBase + " hidden md:inline-block mr-3";

  const demoFlag = (process.env.NEXT_PUBLIC_DEMO === "true");

  let createSpaceOnClickHandler: MouseEventHandler<HTMLButtonElement>;
  if (demoFlag) {
    createSpaceOnClickHandler = demoNotification;
  } else {
    createSpaceOnClickHandler = () => {
      router.push("/create/space");
    }
  }

  return (
    <div>
      <button
        className={buttonStyle}
        onClick={createSpaceOnClickHandler}
      >
        Create new space
      </button>
    </div>
  )
}
