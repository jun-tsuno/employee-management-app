import Link from 'next/link';
import Button from '@/components/ui/button/Button';

const NotFoundPage = () => {
	return (
		<>
			<section className='w-[90%] mx-auto my-32 max-w-[300px] flex flex-col gap-20 items-center'>
				<h1 className='text-2xl font-bold text-text-gray'>
					404 Page Not Found
				</h1>

				<Link href='/employees'>
					<Button primary>Back to Home</Button>
				</Link>
			</section>
		</>
	);
};

export default NotFoundPage;
