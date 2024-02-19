'use client';
import { useState } from 'react';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await signIn('credentials', {
				email: 'random-email@example.com',
				password: 'random-password',
				redirect: false,
			});
			console.log(res);
		} catch (error) {}
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
		</>
	);
};

export default LoginForm;
