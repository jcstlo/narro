import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
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

  const new_links = links.map(async (link) => {
    const new_link = await prisma.link.create({
      data: {
        title: link.title,
        url: link.url,
      },
    });

    return new_link;
  });

  new_links.map(async (new_link) => {
    const link = await new_link;
    console.log(link);
  })
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