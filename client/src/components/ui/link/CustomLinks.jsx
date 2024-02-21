import Link from 'next/link';

export const AddEmployeeLink = () => {
	return (
		<>
			<Link
				href='/new-employee'
				className='bg-green hover:brightness-90 rounded-md text-white font-[500] py-1 px-3 w-16 block text-center'
			>
				Add
			</Link>
		</>
	);
};
