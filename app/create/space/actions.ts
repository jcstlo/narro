"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSpace(formData: FormData) {
  const newSpaceFields = {
    name: formData.get('spacename') as string,
  }

  await prisma.space.create({
    data: {
      name: newSpaceFields.name,
      groups: {
        create: {
          name: `_Unsorted_ ${newSpaceFields.name}`,
        }
      }
    }
  })

  revalidatePath('/space/0');
  redirect('/space/0');
}
