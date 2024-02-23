'use client';
import { useState } from 'react';
import { OfficeIcon, PlusIcon } from '@public/svgs';
import { AddDepartmentModal, DeleteDepartmentModal } from './DepartmentModals';

const ListItem = ({ label, children }) => {
	return (
		<li className='flex items-center gap-3 md:text-lg'>
			<span className='font-bold text-text-gray'>{label}:</span>
			{children}
		</li>
	);
};

export const DepartmentCard = ({ department }) => {
	return (
		<>
			<div className='bg-white rounded-md p-6 border-[1px] shadow-md border-primary-tint'>
				<div className='flex mb-3 md:mb-5 items-center gap-2'>
					<OfficeIcon className='w-6 h-6 text-text-secondary' />
					<p className='text-primary text-xl md:text-2xl font-bold'>
						{department.name}
					</p>
				</div>
				<ul className='space-y-2'>
					<ListItem label='Detail'>{department.description || '-'}</ListItem>
					<ListItem label='Employees'>{'-'}</ListItem>
					<ListItem label='Head'>{department.head_data?.name || '-'}</ListItem>
				</ul>
				<div className='mt-2 flex justify-end'>
					<DeleteDepartmentModal departmentId={department.id} />
				</div>
			</div>
		</>
	);
};

export const AddDepartmentCard = () => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className='bg-white/60 hover:bg-white/40 drop-shadow-sm min-h-[230px] rounded-md flex justify-center items-center'
			>
				<PlusIcon className='w-8 h-8 text-text-secondary' />
			</button>

			{open && <AddDepartmentModal handleClose={handleClose} />}
		</>
	);
};
