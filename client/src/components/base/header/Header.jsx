import Link from 'next/link';

const Header = () => {
	return (
		<>
			<header className='w-full bg-primary text-white py-2 px-4 md:py-4 fixed'>
				<Link href='/' className='block w-fit'>
					Employee Management System
				</Link>
			</header>
		</>
	);
};

export default Header;
