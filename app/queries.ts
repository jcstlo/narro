"use server";

import prisma from "./lib/db";

export async function getAllLinks() {
  const links = await prisma.link.findMany();
  return links;
}