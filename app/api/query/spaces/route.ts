import prisma from "../../../lib/db";

export async function POST() {
  const allSpaces = await prisma.space.findMany({
    orderBy: {
      name: 'asc',
    }
  });

  return new Response(JSON.stringify(allSpaces));
}
