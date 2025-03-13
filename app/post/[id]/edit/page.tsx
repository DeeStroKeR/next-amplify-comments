'use client'
import CreatePostPage from '@/app/components/CreatePostPage';
import Loader from '@/components/Loader';
import { client } from '@/utils/amplify-client';
import { useAuthUser } from '@/utils/useAuthUser';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type Schema } from "@/amplify/data/resource";

type Post = Schema["Post"]["type"];
export default function PostPage() {
	const [post, setPost] = useState<Post | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const { id } = useParams()
	const { user, userLoading } = useAuthUser()

	useEffect(() => {
		if (user?.userId) {
			fetchPost(id as string)
		}
	}, [user])

	const fetchPost = async (id: string) => {
		const { data: post } = await client.models.Post.get({ id }, {
		}).finally(() => setIsLoading(false))

		if (post) {
			setPost(post)
		}
	}
	
	if (userLoading || isLoading) return <Loader />

	if (!user && !userLoading) {
		redirect('/login')
	}

	if (!post && !isLoading) {
		console.error('er')
		return <div>Error fetching post</div>
	}

	return (
		<CreatePostPage postId={id as string} isEdit post={post} userId={user?.userId || ''}/>
	)
}