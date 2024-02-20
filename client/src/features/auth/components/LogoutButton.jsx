'use client';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
	const handleSignOut = async () => {
		await signOut({ redirect: true, callbackUrl: '/' });
	};

	return (
		<button
			onClick={handleSignOut}
			className='border-[1px] py-2 px-4 rounded-md hover:bg-white hover:text-primary'
		>
			Logout
		</button>
	);
};
