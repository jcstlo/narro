import prisma from "../../../lib/db";

export async function POST(request: Request) {
  const milliseconds_24h = 24 * 60 * 60 * 1000;   // 24hr  * 60min/hr * 60sec/min * 1000ms/sec
  const milliseconds_7d = 7 * milliseconds_24h;   // 7day  * 24hr/day
  const milliseconds_30d = 30 * milliseconds_24h; // 30day * 24hr/day

  const queryParams = await request.json();
  const groups = queryParams.groups as string[];
  const sortOrder = queryParams.sortOrder as string;
  const timeCreatedFilter = queryParams.timeCreatedFilter as string;
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

  let timeCreatedFilterQuery = {};
  switch (timeCreatedFilter) {
    case "24h": {
      const date_24h_ago = new Date(Date.now() - milliseconds_24h);
      timeCreatedFilterQuery = {
        gte: date_24h_ago.toISOString(),
      }
      break;
    }
    case "7d": {
      const date_7d_ago = new Date(Date.now() - milliseconds_7d);
      timeCreatedFilterQuery = {
        gte: date_7d_ago.toISOString(),
      }
      break;
    }
    case "30d": {
      const date_30d_ago = new Date(Date.now() - milliseconds_30d);
      timeCreatedFilterQuery = {
        gte: date_30d_ago.toISOString(),
      }
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

  const groupAndQuery = {
    title: {},
    url: {},
    createdAt: {},
  }
  groupAndQuery.title = {
    contains: searchQueryTitle,
    mode: 'insensitive',
  }
  groupAndQuery.url = {
    contains: searchQueryURL,
    mode: 'insensitive',
  }
  groupAndQuery.createdAt = timeCreatedFilterQuery;

  const allLinks = await prisma.link.findMany({
    where: {
      OR: groupOrQuery,
      AND: groupAndQuery,
    },
    orderBy: orderByQuery,
  });

  return new Response(JSON.stringify(allLinks));
}
