"use client"
import { Authenticator, Button } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";


export default function Page() {
	return <Authenticator.Provider>
		<SignOutComponent />
	</Authenticator.Provider>
}

function SignOutComponent() {
	const router = useRouter();

	async function handleLogout() {
		console.log("Logging out...");
		try {
		  await signOut()
		  console.log("Logged out");
		  router.push("/");
		  router.refresh();
		} catch (error) {
		  console.error("Ошибка при выходе:", error);
		}
	}

	return <Button onClick={handleLogout}>Signing out...</Button>
}