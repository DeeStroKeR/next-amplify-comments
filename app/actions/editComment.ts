// 'use server'
import { client } from '@/utils/amplify-client';

export async function editComment(commentId: string, content: string) {
	await client.models.Comment.update({
		id: commentId,
		content
	});
}
