import prisma from "../../../lib/db";

export async function POST(request: Request) {
  const queryParams = await request.json();
  const groups = queryParams.groups as number[];

  const groupOrQuery = groups.map((groupId) => {
    return {
      groups: {
        some: {
          id: groupId,
        }
      }
    }
  })

  let allLinks = await prisma.link.findMany({
    where: {
      OR: groupOrQuery,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return new Response(JSON.stringify(allLinks));
}