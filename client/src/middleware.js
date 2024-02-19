import { withAuth } from 'next-auth/middleware';

export default withAuth(async function middleware(req) {}, {
	callbacks: {
		authorized: ({ token }) => {
			if (token) return true;
			return false;
		},
	},
});

export const config = {
	matcher: ['/dashboard/:path*'],
};
