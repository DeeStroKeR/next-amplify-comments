"use server";

import { AuthGetCurrentUserServer, cookiesClient } from '@/utils/amplify-utils';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const user = await AuthGetCurrentUserServer();

  const { data, errors } = await cookiesClient.models.Post.create({
    title: formData.get("title")?.toString() || "",
    link: formData.get("url")?.toString() || "",
    owner: user?.userId || "",
  });

  console.log(data, errors);
  revalidatePath("/");
  redirect("/");
}
