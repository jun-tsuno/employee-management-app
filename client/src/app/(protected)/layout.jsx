import { SideMenu } from '@/features/menu/components/SideMenu';

export default async function ProtectedPageLayout({ children }) {
	return (
		<div className='flex pt-2 sm:pt-4'>
			<SideMenu className='pl-4 sm:pl-6 md:w-[230px]' />
			<div className='px-3 md:px-6'>{children}</div>
		</div>
	);
}
