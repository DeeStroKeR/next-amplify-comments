import { client } from '@/utils/amplify-client';

export async function deleteComment(commentId: string) {
  await client.models.Comment.delete({ id: commentId });
}
