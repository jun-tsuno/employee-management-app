import toast, { Toaster } from 'react-hot-toast';
import { ErrorIcon, CheckIcon } from '@public/svgs';

export const showSuccessToast = (message) => {
	toast.custom((t) => (
		<div className='bg-emerald-100 flex items-center gap-2 w-[300px] break-keep py-2 px-4 rounded-md'>
			<CheckIcon className='w-6 h-6' />
			<span className='font-[500]'>{message || 'Success!'}</span>
		</div>
	));
};

export const showErrorToast = (message) => {
	toast.custom((t) => (
		<div className='bg-red-100 text-error flex items-center gap-2 w-[300px] break-keep py-2 px-4 rounded-md'>
			<ErrorIcon className='w-6 h-6' />
			<span className='font-[500]'>
				{message || 'Error! Something went wrong'}
			</span>
		</div>
	));
};

export const CustomToaster = () => {
	return (
		<Toaster
			position='top-right'
			toastOptions={{
				duration: 3000,
			}}
		/>
	);
};
