'use server'
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

export async function deletePostWithComments(postId: string) {
  const { data: postWithComments } = await cookiesClient.models.Post.get(
    { id: postId },
    { selectionSet: ["id", "comments.*"] }
  );

  if (postWithComments) {
    await cookiesClient.models.Post.delete({ id: postWithComments.id });

    await Promise.all(
      postWithComments.comments.map((comment) =>
        cookiesClient.models.Comment.delete({ id: comment.id })
      )
    );
  }

  revalidatePath("/");
}
