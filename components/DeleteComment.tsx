"use client";

import { useState } from "react";

export default function DeleteComment({ commentId, postId, deleteMyComment }: { commentId: string, postId: string, deleteMyComment: (commentId: string, postId: string) => Promise<void> }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Post and its comments?")) {
      setIsDeleting(true);
      await deleteMyComment(commentId, postId);
      // setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`cursor-pointer px-2 py-1 text-red-600 hover:bg-red-100 rounded h-fit ${isDeleting ? "opacity-50" : ""}`}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
