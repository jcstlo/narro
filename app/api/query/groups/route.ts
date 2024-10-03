import prisma from "../../../lib/db";

export async function POST(request: Request) {
  const queryParams = await request.json();
  const currentSpaceId = queryParams.currentSpaceId;

  let groupsInSpace;

  if (currentSpaceId === "all") {
    groupsInSpace = await prisma.group.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        space: {
          select: {
            name: true,
          },
        },
      },
    });
  } else {
    groupsInSpace = await prisma.group.findMany({
      where: {
        space: {
          id: currentSpaceId,
        }
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        space: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  return new Response(JSON.stringify(groupsInSpace));
}