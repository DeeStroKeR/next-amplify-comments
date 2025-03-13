
'use client'
import AddComment from '../../../components/AddComment';
import Link from 'next/link';
import DeleteComment from '@/components/DeleteComment';
import { deleteComment } from '@/app/actions/deleteComment';
import { editComment } from '@/app/actions/editComment';
import EditComment from '@/components/EditComment';
import { client } from '@/utils/amplify-client';
import { useAuthUser } from '@/utils/useAuthUser';
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import { type Schema } from "@/amplify/data/resource";

type Post = Schema["Post"]["type"];
type PostWithComments = Post & { comments?: Schema["Comment"]["type"][] };
export default function PostPage() {
	const [post, setPost] = useState<PostWithComments | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const { user, userLoading } = useAuthUser()
	const { id } = useParams()

	useEffect(() => {
		fetchPost(id as string)
	}, [id])

	const fetchPost = async (id: string) => {
		const { data: post } = await client.models.Post.get({ id }, {
			selectionSet: ['id', 'title', 'link', 'comments.*'],
			authMode: 'apiKey'
		}).finally(() => setIsLoading(false))

		client.models.Comment.observeQuery({
				filter: { postId: { eq: '350d5f69-adbe-4e8a-85ad-a03235170917' } },
				authMode: 'apiKey',
			}).subscribe(({ items }) => {
				console.log("subs comment items", items);
				// @ts-expect-error just skip for now
				setPost((prev) => {
					if (!prev) return prev
					return { ...prev, comments: items }
				})
		});

		if (post) {
			// @ts-expect-error just skip for now
			setPost(post)
		}
	}

	const errors = null

	if (isLoading || userLoading) {
		return <Loader />
	}

	if (errors || !post && !isLoading && !userLoading) {
		console.error(errors)
		return <div>Failed to load post</div>
	}

	return <article className="p-5 w-2xl m-auto">
		<h2 className='text-xl font-bold'>{post?.title}</h2>
		<a href={post?.link}>{}{post?.link}</a>
		<div className="pt-5">
			<ul className="flex flex-col gap-4">
				{post?.comments.map((comment) => (
					<li key={comment.id} className='p-4 bg-gray-100 rounded-md'>
						<p>{comment.content}</p>
						<i>{new Date(comment.updatedAt).toLocaleString()} {comment.updatedAt !== comment.createdAt && 'edited'}</i>
						{user?.userId === comment.owner && <div className='flex gap-1'>
							<EditComment postId={id as string} commentId={comment.id} initialContent={comment.content} editComment={editComment}/>
							<DeleteComment postId={id as string} commentId={comment.id} deleteMyComment={deleteComment}/>
						</div>}
					</li>
				))}
			</ul>
			{user?.userId ?
			<AddComment postId={id as string} userId={user.userId}/>
			:
			<p className='mt-4 text-center font-semibold w-full'>You need to <Link className='hover:text-sky-600' href='/login'>login</Link> to comment the post</p>}
		</div>
	</article>
}