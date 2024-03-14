import LoginForm from '@/features/auth/components/LoginForm';

export default function Home() {
	return (
		<>
			<div className='w-[90%] bg-white px-4 rounded-lg md:px-10 py-10 my-20 max-w-[600px] mx-auto'>
				<h1 className='text-lg mb-4 md:mb-8 md:text-2xl text-text-gray font-bold text-center'>
					Login
				</h1>
				<LoginForm />
			</div>
		</>
	);
}
