import Link from "next/link";
import { createPost } from "../actions/createPost";
import { editPost } from "../actions/editPost";
import SubmitButton from '@/components/FormButton';

export default function NewPostPage({ id, isEdit = false, post }: { id?: string, isEdit?: boolean; post?: any }) {
  return (
    <form className="flex flex-col gap-2 p-5 w-2xl m-auto" action={isEdit ? editPost : createPost}>
      <h1 className="font-bold text-2xl w-full text-center">{isEdit ? "Edit Post" : "Create a new post"}</h1>
	  <input value={id} hidden name="postId" readOnly/>
      <input defaultValue={isEdit ? post.title : ""} className="border rounded-lg border-blue-600 w-full p-2" placeholder="Title" type="text" name="title" required/>
      <input defaultValue={isEdit ? post.link : ""} className="border rounded-lg border-blue-600 w-full p-2" placeholder="URL" type="url" name="url" required/>
      <div className="mt-4 flex justify-center items-center gap-4">
		    <SubmitButton text={isEdit ? "Update Post" : "Create Post"} />
        <Link className="inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300" href="/">
          Cancel
        </Link>
      </div>
    </form>
  );
}
