'use client';
import Link from 'next/link';
import Logout from './Logout';
import { Amplify } from 'aws-amplify';
import outputs from "@/amplify_outputs.json";
import { useAuthUser } from '@/utils/useAuthUser';

Amplify.configure(outputs);

export default function Header() {
	const { user, userLoading } = useAuthUser()

	return (
		<header className='flex justify-between items-center p-4 bg-blue-700 text-white'>
			<Link className='font-extrabold text-2xl' href='/'>Comments App</Link>
			{!userLoading && <div className='flex items-center justify-center gap-4'>
				<div>{user ? <span className='text-xl font-semibold'>{user.signInDetails?.loginId}</span> : <Link className='cursor-pointer text-black inline-block px-2 py-1 bg-white font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300k' href='/login'>LOGIN</Link>}</div>
				{user && <Logout />}
			</div>}
		</header>
	)
}
