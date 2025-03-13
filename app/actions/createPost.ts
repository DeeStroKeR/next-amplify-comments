import { client } from '@/utils/amplify-client';
import { redirect } from "next/navigation";

export async function createPost(formData: FormData, userId: string) {

  const { data, errors } = await client.models.Post.create({
    title: formData.get("title")?.toString() || "",
    link: formData.get("url")?.toString() || "",
    owner: userId,
  });

  console.log(data, errors);
  redirect("/");
}
