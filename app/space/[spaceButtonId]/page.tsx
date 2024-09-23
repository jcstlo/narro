import { LinksList } from "@/app/LinksList";

export default async function Page({
  params
}: {
  params: {
    spaceButtonId: string
  }
}) {
  const currentSpaceId = Number(params.spaceButtonId);

  return (
    <LinksList currentSpaceId={currentSpaceId}/>
  );
}