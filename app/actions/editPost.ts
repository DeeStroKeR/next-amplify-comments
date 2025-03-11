"use server";

import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editPost(formData: FormData) {
  const { data, errors } = await cookiesClient.models.Post.update({
    id: formData.get("postId")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    link: formData.get("url")?.toString() || "",
  });

  console.log(data, errors);
  revalidatePath("/");
  redirect("/");
}
