'use client';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

export const Providers = ({ children }) => {
	return (
		<SessionProvider>
			<SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
		</SessionProvider>
	);
};
