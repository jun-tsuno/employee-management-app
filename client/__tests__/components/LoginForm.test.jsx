import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/features/auth/components/LoginForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react', () => ({
	signIn: jest.fn(),
}));
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));
const mockPush = jest.fn();
const mockRefresh = jest.fn();

describe('LoginForm', () => {
	beforeEach(() => {
		useRouter.mockReturnValue({ push: mockPush, refresh: mockRefresh });
	});

	it('displays loading indicator and successfully logs in the user', async () => {
		render(<LoginForm />);

		signIn.mockImplementation(
			() =>
				new Promise((resolve) => {
					setTimeout(() => resolve({ ok: true }), 100);
				})
		);

		// Loading text
		userEvent.click(screen.getByRole('button', { name: /login as a guest/i }));
		await waitFor(
			() => {
				expect(screen.getByText(/please wait.../i)).toBeInTheDocument();
			},
			{
				timeout: 50,
			}
		);

		await waitFor(() => expect(signIn).toHaveBeenCalled());
		// wait until Promise is resolved
		await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/employees'));
	});

	it('shows an error toast when login fails', async () => {
		signIn.mockResolvedValue({ ok: false });

		render(<LoginForm />);

		userEvent.click(screen.getByRole('button', { name: /login as a guest/i }));

		await waitFor(() =>
			expect(screen.queryByText(/please wait.../i)).not.toBeInTheDocument()
		);
	});
});
