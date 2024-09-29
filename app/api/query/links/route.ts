import prisma from "../../../lib/db";

export async function POST(request: Request) {
  const queryParams = await request.json();
  const groups = queryParams.groups as number[];
  const sortOrder = queryParams.sortOrder as string;
  const searchQueryTitle = queryParams.searchQueryTitle as string;
  const searchQueryURL = queryParams.searchQueryURL as string;

  let orderByQuery = {};
  switch (sortOrder) {
    case "newest": {
      orderByQuery = { createdAt: 'desc', }
      break;
    }
    case "oldest": {
      orderByQuery = { createdAt: 'asc', }
      break;
    }
    case "atoz": {
      orderByQuery = { title: 'asc', }
      break;
    }
    case "ztoa": {
      orderByQuery = { title: 'desc', }
      break;
    }
    default: {
      // TODO: throw an error
      orderByQuery = { createdAt: 'desc', }
      break;
    }
  }

  const groupOrQuery = groups.map((groupId) => {
    return {
      groups: {
        some: {
          id: groupId,
        }
      }
    }
  })

  const allLinks = await prisma.link.findMany({
    where: {
      OR: groupOrQuery,
      AND: {
        title: {
          contains: searchQueryTitle,
          mode: 'insensitive',
        },
        url: {
          contains: searchQueryURL,
          mode: 'insensitive',
        }
      },
    },
    orderBy: orderByQuery,
  });

  return new Response(JSON.stringify(allLinks));
}
