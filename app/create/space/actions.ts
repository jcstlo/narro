"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSpace(formData: FormData) {
  const newSpaceFields = {
    name: formData.get('spacename') as string,
  }

  const newSpace = await prisma.space.create({
    data: {
      name: newSpaceFields.name,
    }
  })

  revalidatePath('/space/0');
  redirect('/space/0');
}