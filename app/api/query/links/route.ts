import prisma from "../../../lib/db";

export async function POST(request: Request) {
  const queryParams = await request.json();
  const currentSpaceId = Number(queryParams.currentSpaceId);

  let allLinks;

  if (currentSpaceId === 0) {
    allLinks = await prisma.link.findMany();
  } else {
    allLinks = await prisma.link.findMany({
      where: {
        spaces: {
          some: {
            id: currentSpaceId,
          }
        }
      },
    });
  }

  return new Response(JSON.stringify(allLinks));
}