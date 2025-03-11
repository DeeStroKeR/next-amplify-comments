import DeletePost from '@/components/DeletePost';
import { AuthGetCurrentUserServer, freeClient } from '@/utils/amplify-utils';
import Image from "next/image";
import Link from 'next/link';
import { deletePostWithComments } from "@/app/actions/deletePost";


export default async function Home() {
  const user = await AuthGetCurrentUserServer();

  const { data: posts, errors } = await freeClient.models.Post.list({
    selectionSet: ['id', 'link', 'title', 'owner', 'comments.*']
  });

  if (errors) {
    return <div>Error loading posts</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className='font-extrabold text-2xl text-center w-full'>Hello</h1>
        {!posts || posts.length === 0 && <p>No posts found</p>}
        {posts && posts.length > 0 && (
          <ul className="flex flex-col gap-4">
            {posts.map((post) => (
              <li key={post.id} className='flex flex-col gap-1 p-4 bg-gray-100 rounded-md w-2xl'>
                <div className='flex justify-between'>
                  <h2 className='font-bold'>{post.title}</h2>
                  {user?.userId === post.owner && <div className='flex gap-1'>
                    <Link className='cursor-pointer px-2 py-1 text-gray-600 hover:bg-red-100 rounded' href={`/post/${post.id}/edit`}>Edit</Link>
                    <DeletePost postId={post.id} deletePostWithComments={deletePostWithComments}/>
                  </div>}
                </div>
                <a className='w-fit hover:text-sky-600' href={post.link}>{post.link}</a>
                <p className='text-sm text-gray-600'>Comments: {post.comments.length}</p>
                <a className='w-fit inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300' href={`/post/${post.id}`}>View post</a>
              </li>
            ))}
          </ul>
        )}

        {user ?
        <Link className='m-auto w-fit inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300' href="/post/new">Add New Post</Link>
      :
      <p className='text-center font-semibold w-full'>You need to <Link className='hover:text-sky-600' href='/login'>login</Link> to create a new post</p>}
        
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
