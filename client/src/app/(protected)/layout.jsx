import { SideMenu } from '@/features/menu/components/SideMenu';

export default async function ProtectedPageLayout({ children }) {
	return (
		<div className='flex pt-4 sm:pt-8 max-w-[1440px] mx-auto pb-20 md:pb-40'>
			<SideMenu className='pl-4 sm:pl-6 md:w-[230px] md:min-w-[230px]' />
			<div className='px-3 md:px-6 grow'>{children}</div>
		</div>
	);
}
