import { LinksList } from "@/app/LinksList";
import { AppShellMain, AppShellNavbar, Skeleton } from "@mantine/core";

export default async function Page({
  params
}: {
  params: {
    spaceButtonId: string
  }
}) {
  const currentSpaceId = Number(params.spaceButtonId);

  return (
    <div>
    <AppShellNavbar p="md">
      Navbar
      {Array(15)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} h={28} mt="sm" animate={false} />
        ))}
    </AppShellNavbar>
    <AppShellMain>
      <LinksList currentSpaceId={currentSpaceId}/>
    </AppShellMain>
    </div>
  );
}