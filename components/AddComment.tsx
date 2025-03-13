import Link from 'next/link';
import SubmitButton from './FormButton';
import { client } from '@/utils/amplify-client';

export default function AddComment({ postId, userId } : { postId: string, userId: string }) {
	async function AddComment(formData: FormData) {
		const { data, errors } = await client.models.Comment.create({
			owner: userId || '',
			content: formData.get('content')?.toString() || '',
			postId: postId,
		})

		console.log(data, errors)
	}

	return <form action={AddComment} className='py-5 w-full'>
		<div className='flex flex-col items-start'>
			<textarea className='border rounded-lg border-blue-600 w-full p-4 resize-none' name="content" required/>
			<div className='mt-4 flex justify-center items-center gap-4 w-full'>
				<SubmitButton text={'Add comment'} />
				<Link className='inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300' href='/'>Cancel</Link>
			</div>
		</div>
	</form>
}