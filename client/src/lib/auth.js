import CredentialsProvider from 'next-auth/providers/credentials';
import { serverAPI } from './fetchApi';

export const authOptions = {
	pages: {
		signIn: '/',
	},
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24, // 1day
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				// if (!credentials?.email || !credentials.password) return null;

				try {
					const res = await serverAPI('/login', {
						method: 'POST',
						body: JSON.stringify({
							email: process.env.NEXT_PUBLIC_DEMO_EMAIL, // for demo
							password: process.env.NEXT_PUBLIC_DEMO_PASSWORD,
						}),
					});
					const result = await res.json();

					if (result.error) {
						throw new Error(result.error);
					}

					return {
						id: result?.user?.id,
						username: result?.user?.username,
						email: result?.user?.email,
						access_token: result.token,
					};
				} catch (error) {
					console.log(error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					...user,
				};
			}
			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					id: token.id,
					username: token.username,
					email: token.email,
					access_token: token.access_token,
				},
			};
		},
	},
	events: {
		async signOut({ token }) {
			const accessToken = token.access_token;
		},
	},
};
