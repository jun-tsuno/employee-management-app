'use client';
import { useState } from 'react';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { signIn } from 'next-auth/react';
import { CustomToaster, showErrorToast } from '@/components/ui/toast/Toast';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await signIn('credentials', {
				email: 'random-email@example.com',
				password: 'random-password',
				redirect: false,
			});

			if (!res.ok) throw new Error();
			router.refresh();
			router.push('/dashboard');
		} catch (error) {
			return showErrorToast('Fail to login');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='flex flex-col gap-4 mb-10'>
					<Input
						id='login-email'
						label='Email'
						type='email'
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='** login with a guest account'
						disabled
					/>
					<Input
						id='login-password'
						label='Password'
						type='password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='** login with a guest account'
						disabled
					/>
				</div>
				<Button type='submit' primary className='w-full'>
					Login as a guest
				</Button>
			</form>

			<CustomToaster />
		</>
	);
};

export default LoginForm;
