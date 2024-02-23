'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HookFormInput } from '@/components/ui/input/HookFormInput';
import { OfficeIcon, TrashIcon } from '@public/svgs';
import { useCreateDepartment } from '../hooks/use-departments';
import { useRouter } from 'next/navigation';
import ModalWrapper from '@/components/ui/modal/ModalWrapper';
import Button from '@/components/ui/button/Button';

const addDepartmentRules = {
	required: { required: 'This field is required' },
};

export const AddDepartmentModal = ({ handleClose }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const { isLoading, error, createDepartment } = useCreateDepartment();
	const router = useRouter();

	const handleCancel = () => {
		reset();
		handleClose();
	};

	const onSubmit = async (data) => {
		let dataToSend = {
			...data,
			head: null,
		};
		const result = await createDepartment(dataToSend);
		if (result.created) {
			router.refresh();
			reset();
			handleClose();
		}
	};

	return (
		<>
			<ModalWrapper className='w-[90%] max-w-[550px] p-6 md:p-8'>
				<div className='flex items-center gap-2 mb-4 md:mb-6'>
					<OfficeIcon className='w-8 h-8 text-text-secondary' />
					<p className='text-xl md:text-2xl font-bold text-text-secondary'>
						New Department
					</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='grid gap-4'>
						<HookFormInput
							label='Name'
							placeholder='HR'
							{...register('name', addDepartmentRules.required)}
							required
							error={errors.name}
						/>
						<HookFormInput
							label='Description'
							{...register('description', addDepartmentRules.required)}
							required
							error={errors.description}
						/>
					</div>
					<div className='flex items-center gap-3 justify-evenly mt-8'>
						<Button
							onClick={handleCancel}
							cancel
							disabled={isLoading}
							className='w-full'
						>
							Cancel
						</Button>
						<Button
							type='submit'
							secondary
							disabled={isLoading}
							className='w-full'
						>
							Add
						</Button>
					</div>
				</form>
				{error && (
					<p className='text-sm text-error text-center pt-3'>{error}</p>
				)}
			</ModalWrapper>
		</>
	);
};

export const DeleteDepartmentModal = () => {
	const [open, setOpen] = useState(false);

	const handleDelete = () => {};

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className='bg-text-placeholder hover:text-text-placeholder hover:bg-danger py-1 px-2 rounded-md'
			>
				<TrashIcon className='w-5 h-5' />
			</button>

			{open && (
				<ModalWrapper className='w-[90%] max-w-[550px] p-4 sm:p-6 md:p-8'>
					<p className='text-center font-[500] text-text-primary text-xl mb-4'>
						Are you sure to delete?
					</p>
					<p className='text-center'>
						If you delete it, the data is completely deleted from the database.
					</p>
					<div className='mt-8 flex gap-3 justify-evenly max-w-[400px] mx-auto'>
						<Button onClick={() => setOpen(false)} cancel className='w-full'>
							Cancel
						</Button>
						<Button onClick={handleDelete} danger className='w-full'>
							Delete
						</Button>
					</div>
				</ModalWrapper>
			)}
		</>
	);
};
