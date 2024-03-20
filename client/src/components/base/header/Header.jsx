'use client';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { useSession } from 'next-auth/react';

const Header = () => {
	const { data: session } = useSession(authOptions);

	return (
		<>
			<header className='w-full bg-primary text-white z-20 py-2 px-4 md:py-4 fixed'>
				<div className='flex items-center justify-between'>
					<Link href='/' className='block w-fit'>
						Employee Management System
					</Link>

					{session && <LogoutButton />}
				</div>
			</header>
		</>
	);
};

export default Header;
