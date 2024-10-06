import { notifications } from "@mantine/notifications"
import { MouseEventHandler } from "react"

export const demoNotification: MouseEventHandler<HTMLButtonElement> = () => {
  notifications.show({
    title: "Restricted in demo",
    message: "Cannot perform this action in the demo version!",
    color: "red",
    position: "top-center",
  })
}
