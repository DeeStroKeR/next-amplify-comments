
import { AuthGetCurrentUserServer, freeClient } from '@/utils/amplify-utils';
import AddComment from '../../../components/AddComment';
import Link from 'next/link';
import DeleteComment from '@/components/DeleteComment';
import { deleteComment } from '@/app/actions/deleteComment';
import { editComment } from '@/app/actions/editComment';
import EditComment from '@/components/EditComment';


export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
	const user = await AuthGetCurrentUserServer();
	const { id } = await params

	const { data: post, errors } = await freeClient.models.Post.get({ id }, {
		selectionSet: ['id', 'title', 'link', 'comments.*'],
	})

	if (errors || !post) {
		console.error(errors)
		return <div>Failed to load post</div>
	}

	return <article className="p-5 w-2xl m-auto">
		<h2 className='text-xl font-bold'>{post.title}</h2>
		<a href={post.link}>{}{post.link}</a>
		<div className="pt-5">
			<ul className="flex flex-col gap-4">
				{post.comments.map((comment) => (
					<li key={comment.id} className='p-4 bg-gray-100 rounded-md'>
						<p>{comment.content}</p>
						<i>{new Date(comment.updatedAt).toLocaleString()} {comment.updatedAt !== comment.createdAt && 'edited'}</i>
						{user?.userId === comment.owner && <div className='flex gap-1'>
							<EditComment postId={id} commentId={comment.id} initialContent={comment.content} editComment={editComment}/>
							<DeleteComment postId={id} commentId={comment.id} deleteMyComment={deleteComment}/>
						</div>}
					</li>
				))}
			</ul>
			{user ?
			<AddComment postId={id}/>
			:
			<p className='mt-4 text-center font-semibold w-full'>You need to <Link className='hover:text-sky-600' href='/login'>login</Link> to comment the post</p>}
		</div>
	</article>
}