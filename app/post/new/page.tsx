'use client'
import CreatePostPage from '@/app/components/CreatePostPage';
import Loader from '@/components/Loader';
import { useAuthUser } from '@/utils/useAuthUser';
import { redirect } from 'next/navigation';

export default function PostPage() {
	const { user, userLoading } = useAuthUser()

	if (userLoading) return <Loader />

	if (!user && !userLoading) {
		redirect('/login')
	}

	return (
		<CreatePostPage userId={user?.userId || ''}/>
	)
}