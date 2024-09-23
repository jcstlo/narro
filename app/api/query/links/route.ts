import prisma from "../../../lib/db";

export async function POST(request: Request) {
  const queryParams = await request.json();
  const testBool = queryParams.testJSONValue;

  let testURL = "reddit.com";
  if (testBool) {
    testURL = "youtube.com";
  }

  let testSpaceID = 5;
  if (testBool) {
    testSpaceID = 6;
  }

  const allLinks = await prisma.link.findMany({
    where: {
      spaces: {
        some: {
          id: testSpaceID,
        }
      }
    },
  });

  return new Response(JSON.stringify(allLinks));
}