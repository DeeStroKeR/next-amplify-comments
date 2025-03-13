'use client';

import { useEffect, useState } from 'react';

type EditCommentProps = {
  commentId: string;
  initialContent: string;
  postId: string;
  editComment: (commentId: string, content: string, postId: string) => Promise<void>;
};

export default function EditComment({ commentId, initialContent, postId, editComment }: EditCommentProps) {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsEditing(false);
    setIsSubmitting(false);
  }, [initialContent]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setContent(initialContent);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    setIsSubmitting(true);
    await editComment(commentId, content, postId).then(() => { 
      setIsEditing(false);
      setIsSubmitting(false);
    });
    // setIsEditing(false);
    // setIsSubmitting(false);
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit} className='w-full'>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            required
            className="border rounded-lg border-blue-600 w-full p-4 resize-none"
          />
          <div className="mt-2">
            <button type="submit" className="cursor-pointer px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cursor-pointer ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={handleEdit} className="cursor-pointer px-2 py-1 hover:text-blue-700 text-blue-500">
          Edit
        </button>
      )}
    </>
  );
}
