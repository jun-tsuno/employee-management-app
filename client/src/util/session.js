import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const getServerSideToken = async () => {
	const session = await getServerSession(authOptions);
	if (!session) return null;

	const token = session.user?.access_token;
	if (token) {
		return token;
	} else {
		return null;
	}
};
