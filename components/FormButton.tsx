'use client';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ text }: { text: string }) {
	const { pending } = useFormStatus();
  
	return (
	  <button
		type="submit"
		disabled={pending}
		className={`cursor-pointer w-fit inline-block px-4 py-2 
		  ${pending ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} 
		  text-white font-semibold rounded-lg transition-colors duration-300`}
	  >
		{pending ? "Loading..." : text}
	  </button>
	);
  }