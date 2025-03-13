import { client } from '@/utils/amplify-client';
import { redirect } from "next/navigation";

export async function editPost(formData: FormData) {
  const { data, errors } = await client.models.Post.update({
    id: formData.get("postId")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    link: formData.get("url")?.toString() || "",
  });

  console.log(data, errors);
  redirect("/");
}
