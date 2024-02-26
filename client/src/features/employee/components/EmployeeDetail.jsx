'use client';
import { useState } from 'react';
import { useDeleteEmployee, useUpdateEmployee } from '../hooks/use-employees';
import { useRouter } from 'next/navigation';
import { EmployeeFormFields } from './EmployeeForms';
import { useForm } from 'react-hook-form';
import { showErrorToast, showSuccessToast } from '@/components/ui/toast/Toast';
import ModalWrapper from '@/components/ui/modal/ModalWrapper';
import Button from '@/components/ui/button/Button';

export const SectionWrapper = ({ title, children }) => {
	return (
		<section className='pb-4 md:pb-8'>
			<h2 className='py-1 mb-2 text-sm md:px-8 px-4 text-white rounded-t-md bg-primary'>
				{title}
			</h2>
			{children}
		</section>
	);
};

export const EmployeeDataItem = ({ label, children, className }) => {
	return (
		<dl className={`${className ? className : ''}`}>
			<dt className='text-sm text-text-secondary mb-1'>{label}</dt>
			<dd>{children}</dd>
		</dl>
	);
};

export const DeleteEmployeeModal = ({ employeeId }) => {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState('');

	const { isLoading, deleteEmployee } = useDeleteEmployee();
	const router = useRouter();

	const handleOpen = () => {
		setError('');
		setOpen(true);
	};

	const handleDelete = async () => {
		const result = await deleteEmployee(employeeId);

		if (!result.deleted) return setError('Fail to Delete');
		setError('');
		router.push('/employees');
	};

	return (
		<>
			<Button onClick={handleOpen} danger>
				Delete
			</Button>

			{open && (
				<ModalWrapper className='w-[90%] p-4 sm:px-6 sm:py-12 max-w-[550px]'>
					<h3 className='text-center font-[500] text-xl mb-3 md:mb-6'>
						Are you sure to delete this employee?
					</h3>
					<p className='text-center'>
						If you delete it, it will be completely deleted from the database.
					</p>

					<div className='mt-6 flex w-full mx-auto max-w-[400px] items-center gap-4 justify-evenly'>
						<Button
							onClick={() => setOpen(false)}
							cancel
							disabled={isLoading}
							className='w-full'
						>
							Cancel
						</Button>
						<Button
							onClick={handleDelete}
							danger
							disabled={isLoading}
							className='w-full'
						>
							Delete
						</Button>
					</div>

					{error && (
						<p className='text-sm text-center mt-2 text-error'>{error}</p>
					)}
				</ModalWrapper>
			)}
		</>
	);
};

export const EditEmployeeModal = ({ employee }) => {
	const [open, setOpen] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			first_name: employee.first_name,
			last_name: employee.last_name,
			tel: employee.tel || '',
			email: employee.email,
			hired_date: employee.hired_date || '',
			is_on_leave: employee.is_on_leave,
			salary: Number(employee.salary) || 0,
			employment_type: employee.employment_type_data?.key || null,
			position: employee.position_data?.id || null,
			department: employee.department_data?.id || null,
		},
	});

	const { isLoading, updateEmployee } = useUpdateEmployee();
	const router = useRouter();

	const onSubmit = async (data) => {
		let dataToSend = {
			first_name: data.first_name,
			last_name: data.last_name,
			tel: data.tel || null,
			email: data.email,
			hired_date: data.hired_date || null,
			is_on_leave: data.is_on_leave,
			salary: Number(data.salary) || 0,
			employment_type: data.employment_type || null,
			position: data.position || null,
			department: data.department || null,
		};

		const result = await updateEmployee({
			employeeId: employee.id,
			data: dataToSend,
		});

		if (!result.updated) return showErrorToast(result.error);
		reset();
		router.refresh();
		setOpen(false);
		return showSuccessToast('Successfully Updated!');
	};

	return (
		<>
			<Button onClick={() => setOpen(true)} secondary>
				Edit Employee
			</Button>

			{open && (
				<ModalWrapper className='w-[90%] bg-background px-4 py-8 md:px-6 lg:px-8 lg:py-16 max-w-[900px] md:py-12 sm:p-6'>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
						<EmployeeFormFields register={register} errors={errors} />
						<div className='mt-6 flex items-center gap-4 justify-evenly w-full max-w-[400px] mx-auto'>
							<Button
								onClick={() => setOpen(false)}
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
								Update
							</Button>
						</div>
					</form>
				</ModalWrapper>
			)}
		</>
	);
};
