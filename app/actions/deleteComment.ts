'use server'
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

export async function deleteComment(commentId: string, postId: string) {
await cookiesClient.models.Comment.delete({ id: commentId });

  revalidatePath(`/posts/${postId}`);
}
