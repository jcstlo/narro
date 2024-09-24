import prisma from "../../../lib/db";

export async function POST(request: Request) {
  const queryParams = await request.json();
  const currentSpaceId = Number(queryParams.currentSpaceId);

  let groupsInSpace;

  if (currentSpaceId === 0) {
    groupsInSpace = await prisma.group.findMany();
  } else {
    groupsInSpace = await prisma.group.findMany({
      where: {
        space: {
          id: currentSpaceId,
        }
      },
    });
  }

  return new Response(JSON.stringify(groupsInSpace));
}