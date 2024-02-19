import '../styles/globals.css';
import Header from '@/components/base/header/Header';
import { Providers } from './providers';

export const metadata = {
	title: {
		default: 'EMS',
		template: '%s | EMS',
	},
	description: 'Easy Employee Management System',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					<Header />
					<main className='pt-10 md:pt-14'>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
