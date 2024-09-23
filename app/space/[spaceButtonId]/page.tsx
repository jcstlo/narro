import { CollapseNavbarLayout } from "@/app/CollapseNavbarLayout";

export default async function Page({
  params
}: {
  params: {
    spaceButtonId: string
  }
}) {
  const currentSpaceId = Number(params.spaceButtonId);

  return (
    <CollapseNavbarLayout
      currentSpaceId={currentSpaceId}
    />
  );
}