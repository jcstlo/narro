import prisma from "@/app/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const exportQuery = searchParams.get('exportQuery'); // expecting /api/export?exportQuery=...

  switch (exportQuery) {
    case "all_spaces":
      // return JSON with all spaces
      const allSpaces = await prisma.space.findMany({
        select: {
          id: true,
          name: true,
        }
      })
      return new Response(JSON.stringify(allSpaces));
    case "all_groups":
      // return JSON with all groups
      const allGroups = await prisma.group.findMany({
        select: {
          id: true,
          name: true,
          spaceId: true,
        }
      })
      return new Response(JSON.stringify(allGroups));
    case "all_links":
      // return JSON with all links
      const allLinks = await prisma.link.findMany({
        select: {
          id: true,
          title: true,
          url: true,
          groups: {
            select: {
              id: true,
            }
          }
        },
      })
      return new Response(JSON.stringify(allLinks));
    default:
      return new Response("Error: Invalid export query");
  }
}