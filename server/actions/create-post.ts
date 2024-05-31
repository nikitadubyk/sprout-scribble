"use server";

import { db } from "@/server";

import { posts } from "../schema";
import { revalidatePath } from "next/cache";

export default async function createPost(data: FormData) {
  const title = data.get("title");
  if (!title) {
    return { error: "No title" };
  }

  const createdPost = await db
    .insert(posts)
    .values({ title: title.toString() });

  revalidatePath("/");
  return { success: createdPost };
}
