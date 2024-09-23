import prisma from "../../../lib/db";

export async function POST(request: Request) {
  const allSpaces = await prisma.space.findMany();

  return new Response(JSON.stringify(allSpaces));
}