"use server";

import prisma from "@/app/lib/db";

export async function createBookmark(formData: FormData) {
  const newBookmarkFields = {
    name: formData.get('linkname') as string,
    url: formData.get('linkurl') as string,
    spaceId: formData.get('spaceId') as string,
    selectedGroups: formData.getAll('selectedGroups') as string[],
    unsortedGroupId: formData.get('unsortedGroupId') as string,
  }

  let connectGroups = {};
  if (newBookmarkFields.selectedGroups.length > 0) {
    const groupsArray = newBookmarkFields.selectedGroups.map((group) => {
      return { id: group }
    })
    connectGroups = {
      connect: groupsArray,
    }
  } else {
    connectGroups = {
      connect: {
        id: newBookmarkFields.unsortedGroupId,
      },
    }
  }

  await prisma.link.create({
    data: {
      title: newBookmarkFields.name,
      url: newBookmarkFields.url,
      groups: connectGroups,
    }
  })
}

export async function createGroup(formData: FormData) {
  const newGroupFields = {
    name: formData.get('groupname') as string,
    spaceId: formData.get('spaceId') as string,
  }

  try {
    await prisma.group.create({
      data: {
        name: newGroupFields.name,
        space: {
          connect: {
            id: newGroupFields.spaceId,
          }
        },
      }
    })
  } catch (_err) {
    console.log('This group name already exists. Please use a different name.')
    return {
      error: "This group name already exists. Please use a different name."
    };
  }
}
