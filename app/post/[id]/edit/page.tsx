import CreatePostPage from '@/app/components/CreatePostPage';
import { cookiesClient } from '@/utils/amplify-utils';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const { data: post, errors } = await cookiesClient.models.Post.get({
		id
	})

	if (errors) {
		console.error(errors)
		return <div>Error fetching post</div>
	}

	return (
		<CreatePostPage id={id} isEdit post={post}/>
	)
}