import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { LogoutButton } from '@/features/auth/components/LogoutButton';

const Header = async () => {
	const session = await getServerSession(authOptions);

	return (
		<>
			<header className='w-full bg-primary text-white py-2 px-4 md:py-4 fixed'>
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
