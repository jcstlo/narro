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

  // create 2 new groups per space
  const newGroup1SpaceA = await prisma.group.create({
    data: {
      name: "Group A1",
      spaceId: newSpaceA.id,
      links: {
        connect: [
          { id: (await newLinksSpaceA[0]).id },
          { id: (await newLinksSpaceA[1]).id },
        ]
      }
    }
  })
  const newGroup2SpaceA = await prisma.group.create({
    data: {
      name: "Group A2",
      spaceId: newSpaceA.id,
      links: {
        connect: [
          { id: (await newLinksSpaceA[2]).id },
        ]
      }
    }
  })
  const newGroup1SpaceB = await prisma.group.create({
    data: {
      name: "Group B1",
      spaceId: newSpaceB.id,
      links: {
        connect: [
          { id: (await newLinksSpaceB[0]).id },
          { id: (await newLinksSpaceB[1]).id },
        ]
      }
    }
  })
  const newGroup2SpaceB = await prisma.group.create({
    data: {
      name: "Group B2",
      spaceId: newSpaceB.id,
      links: {
        connect: [
          { id: (await newLinksSpaceB[2]).id },
        ]
      }
    }
  })

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

  console.log(newGroup2SpaceA);
  console.log(newGroup2SpaceB);
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