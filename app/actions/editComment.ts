'use server'
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

export async function editComment(commentId: string, content: string, postId: string) {
	await cookiesClient.models.Comment.update({
		id: commentId,
		content
	});

  	revalidatePath(`/posts/${postId}`);
}
