import prisma from "@/app/lib/db";
import { NextRequest } from "next/server";

interface linkJSONObject {
  id: number;
  title: string;
  url: string;
  groups: {
    id: number;
  }[];
}

interface groupJSONObject {
  id: number;
  name: string;
  spaceId: number;
}

interface spaceJSONObject {
  id: number;
  name: string;
}

export async function POST(request: NextRequest) {
  const importData = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const importQuery = searchParams.get('importQuery'); // expecting /api/import?importQuery=...

  switch (importQuery) {
    case "import_spaces":
      const importSpaces = importData as spaceJSONObject[];
      try {
        await Promise.all(
          importSpaces.map(async (space) => {
            await prisma.space.create({
              data: {
                id: space.id,
                name: space.name,
              },
            });
          })
        );
      return new Response("Successfully added spaces")
    } catch (_err) {
      return new Response("An error occurred", { status: 500 });
    }

    case "import_groups":
      const importGroups = importData as groupJSONObject[];
      try {
        await Promise.all(
          importGroups.map(async (group) => {
            await prisma.group.create({
              data: {
                id: group.id,
                name: group.name,
                spaceId: group.spaceId,
              },
            });
          })
        );
        return new Response("Successfully added groups")
      } catch (_err) {
        return new Response("An error occurred", { status: 500 });
      }

    case "import_links":
      const importLinks = importData as linkJSONObject[];
      try {
        await Promise.all(
          importLinks.map(async (link) => {
            await prisma.link.create({
              data: {
                id: link.id,
                title: link.title,
                url: link.url,
                groups: {
                  connect: link.groups,
                },
              },
            });
          })
        );
        return new Response("Successfully added links");
      } catch (_err) {
        return new Response("An error occurred", { status: 500 });
      }
    default:
      return new Response("Error: Invalid import query");
  }
}