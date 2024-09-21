import prisma from "../../lib/db";

export async function POST(request: Request) {
  const queryParams = await request.json();
  const testBool = queryParams.testJSONValue;

  let testURL = "reddit.com";
  if (testBool) {
    testURL = "youtube.com";
  }

  const allLinks = await prisma.link.findMany({
    where: {
      url: testURL,
    },
  });

  return new Response(JSON.stringify(allLinks));
}