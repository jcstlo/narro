"use server";

import { revalidatePath } from "next/cache";

export async function createBookmark(formData: FormData) {
  const newBookmarkFields = {
    name: formData.get('linkname'),
    url: formData.get('linkurl'),
    spaceId: formData.get('spaceId'),
    selectedGroups: formData.getAll('selectedGroups'),
  }

  console.log(newBookmarkFields);
  revalidatePath(`/space/${newBookmarkFields.spaceId}`)
}