import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const newSpaceA = await prisma.space.create({
    data: {
      name: "Space A",
    }
  });

  const newSpaceB = await prisma.space.create({
    data: {
      name: "Space B",
    }
  });

  const links = [
    {
      title: "Link 1",
      url: "google.com",
    },
    {
      title: "Link 2",
      url: "youtube.com",
    },
    {
      title: "Link 3",
      url: "reddit.com",
    },
  ]

  const newLinksSpaceA = links.map(async (link) => {
    const new_link = await prisma.link.create({
      data: {
        title: link.title,
        url: link.url,
        spaces: {
          connect: {
            id: newSpaceA.id,
          }
        },
      },
    });

    return new_link;
  });

  const newLinksSpaceB = links.map(async (link) => {
    const new_link = await prisma.link.create({
      data: {
        title: link.title,
        url: link.url,
        spaces: {
          connect: {
            id: newSpaceB.id,
          }
        },
      },
    });

    return new_link;
  });

  console.log(newSpaceA);
  console.log(newSpaceB);

  newLinksSpaceA.map(async (new_link) => {
    const link = await new_link;
    console.log(link);
  });

  newLinksSpaceB.map(async (new_link) => {
    const link = await new_link;
    console.log(link);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })