import { CollapseNavbarLayout } from "./CollapseNavbarLayout";
import { getAllLinks } from "./queries";

export default async function Home() {
  const allLinks = await getAllLinks();

  return (
    <CollapseNavbarLayout
      allLinks={allLinks}
    />
  );
}
