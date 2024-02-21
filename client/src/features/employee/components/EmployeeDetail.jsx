'use client';
import { useState } from 'react';
import ModalWrapper from '@/components/ui/modal/ModalWrapper';
import Button from '@/components/ui/button/Button';
import { useDeleteEmployee } from '../hooks/use-employees';
import { useRouter } from 'next/navigation';

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
				<ModalWrapper className='w-[90%] p-4 sm:p-6 max-w-[550px]'>
					<h3 className='text-center font-[500] text-xl mb-3 md:mb-6'>
						Are you sure to delete this employee?
					</h3>
					<p className='text-center'>
						If you delete it, it will be completely deleted from the database.
					</p>

					<div className='mt-6 flex items-center gap-4 justify-center'>
						<Button onClick={() => setOpen(false)} cancel disabled={isLoading}>
							Cancel
						</Button>
						<Button onClick={handleDelete} danger disabled={isLoading}>
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
