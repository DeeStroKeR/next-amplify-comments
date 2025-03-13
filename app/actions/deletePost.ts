import { client } from '@/utils/amplify-client';

export async function deletePostWithComments(postId: string) {
  const { data: postWithComments } = await client.models.Post.get(
    { id: postId },
    { selectionSet: ["id", "comments.*"] }
  );

  if (postWithComments) {
    await client.models.Post.delete({ id: postWithComments.id });

    await Promise.all(
      postWithComments.comments.map((comment) =>
        client.models.Comment.delete({ id: comment.id })
      )
    );
  }
}
