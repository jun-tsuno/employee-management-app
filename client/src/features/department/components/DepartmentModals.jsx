'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HookFormInput } from '@/components/ui/input/HookFormInput';
import { OfficeIcon, TrashIcon, PersonIcon } from '@public/svgs';
import {
	useCreateDepartment,
	useDeleteDepartment,
	useUpdateDepartment,
} from '../hooks/use-departments';
import { useRouter } from 'next/navigation';
import { ErrorLabel } from '@/components/ui/error/Errors';
import { showSuccessToast } from '@/components/ui/toast/Toast';
import ModalWrapper from '@/components/ui/modal/ModalWrapper';
import Button from '@/components/ui/button/Button';
import { SelectHead } from '@/features/employee/components/SelectHead';

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

export const DeleteDepartmentModal = ({ departmentId }) => {
	const [open, setOpen] = useState(false);
	const { isLoading, error, deleteDepartment } = useDeleteDepartment();

	const handleDelete = async () => {
		const result = await deleteDepartment(departmentId);
		if (result.deleted) return setOpen(false);
	};

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className='bg-text-placeholder hover:text-text-placeholder hover:bg-danger py-1 px-2 rounded-md'
			>
				<TrashIcon className='w-5 h-5' />
			</button>

			{open && (
				<ModalWrapper className='w-[90%] flex flex-col gap-4 md:gap-8 max-w-[550px] p-4 sm:p-6 md:p-8'>
					<p className='text-center font-[500] text-text-primary text-xl'>
						Are you sure to delete?
					</p>
					<p className='text-center'>
						If you delete it, the data is completely deleted from the database.
					</p>
					<div className='flex w-full gap-3 justify-evenly max-w-[400px] mx-auto'>
						<Button
							onClick={() => setOpen(false)}
							disabled={isLoading}
							cancel
							className='w-full'
						>
							Cancel
						</Button>
						<Button
							onClick={handleDelete}
							disabled={isLoading}
							danger
							className='w-full'
						>
							Delete
						</Button>
					</div>
					{error && <ErrorLabel message={error} />}
				</ModalWrapper>
			)}
		</>
	);
};

export const EditHeadModal = ({ department }) => {
	const [open, setOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const { isLoading, updateDepartment, error } = useUpdateDepartment();

	const currHead = department.head_data;

	const handleCancel = () => {
		setOpen(false);
	};

	const handleUpdate = async () => {
		const data = {
			name: department.name,
			description: department.description,
			head: selectedEmployee.id,
		};
		const result = await updateDepartment({
			departmentId: department.id,
			data,
		});

		if (result.updated) {
			setOpen(false);
			setSelectedEmployee(null);
			showSuccessToast('Updated Head');
		}
	};

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className='bg-text-placeholder py-1 px-2 rounded-md hover:bg-text-secondary hover:text-white'
			>
				<PersonIcon className='w-4 h-4' />
			</button>

			{open && (
				<ModalWrapper className='w-[90%] flex flex-col h-[80vh] max-w-[550px] p-6 md:py-8 md:px-12'>
					<div className='flex items-center gap-3 mb-4 md:mb-6 '>
						<PersonIcon className='w-6 h-6 text-text-secondary' />
						<p className='text-xl md:text-2xl font-bold text-text-secondary'>
							Change Head
						</p>
					</div>

					<section className='space-y-4 my-6'>
						<h3 className='text-text-secondary'>Current</h3>
						<ul>
							<li className='font-bold sm:text-xl text-text-gray'>
								{currHead?.name || '-'}
							</li>
							<li className='flex items-center gap-3'>
								<span className='text-sm text-text-secondary'>ID:</span>
								<span>{currHead?.employee_number || '-'}</span>
							</li>
						</ul>
					</section>
					<SelectHead
						selectedEmployee={selectedEmployee}
						setSelectedEmployee={setSelectedEmployee}
					/>
					<div className='flex items-center mt-auto gap-3 justify-evenly mb-4'>
						<Button
							onClick={handleCancel}
							cancel
							disabled={isLoading}
							className='w-full'
						>
							Cancel
						</Button>
						<Button
							onClick={handleUpdate}
							secondary
							disabled={!selectedEmployee || isLoading}
							className='w-full'
						>
							Update
						</Button>
					</div>
					{error && (
						<p className='text-sm text-error text-center pt-3'>{error}</p>
					)}
				</ModalWrapper>
			)}
		</>
	);
};
