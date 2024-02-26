import '../styles/globals.css';
import { Providers } from './providers';
import { CustomToaster } from '@/components/ui/toast/Toast';
import Header from '@/components/base/header/Header';
import Footer from '@/components/base/footer/Footer';

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
			<body className='flex flex-col min-h-[100vh]'>
				<Providers>
					<Header />
					<main className='pt-16 grow md:pt-20'>{children}</main>
					<Footer />
					<CustomToaster />
				</Providers>
			</body>
		</html>
	);
}
