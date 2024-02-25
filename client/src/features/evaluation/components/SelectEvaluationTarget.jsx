'use client';
import { useState } from 'react';
import { SearchEmployee } from '@/features/employee/components/SearchEmployee';
import { customDateFormatter } from '@/util/date-formatter';
import Button from '@/components/ui/button/Button';
import Link from 'next/link';

const ListItem = ({ label, children, className }) => {
	return (
		<li className={`flex items-center gap-3 ${className ? className : ''}`}>
			<span className='font-[500] text-text-secondary'>{label}</span>
			<span>{children}</span>
		</li>
	);
};

export const SelectEvaluationTarget = () => {
	const [selectedEmployee, setSelectedEmployee] = useState(null);

	const startedDate =
		selectedEmployee &&
		customDateFormatter(selectedEmployee.hired_date, 'yyyy-M-d');

	return (
		<>
			<SearchEmployee
				selectedEmployee={selectedEmployee}
				setSelectedEmployee={setSelectedEmployee}
				className='max-w-[400px] mb-8'
			/>

			{selectedEmployee && (
				<div className='max-w-[600px] flex flex-col gap-4 md:gap-8'>
					<div className='bg-white p-6 rounded-lg'>
						<p className='text-text-gray font-bold text-xl mb-4 md:text-2xl'>{`${selectedEmployee.first_name} ${selectedEmployee.last_name}`}</p>
						<ul className='space-y-2'>
							<ListItem label='ID:'>
								{selectedEmployee.employee_number || '-'}
							</ListItem>
							<ListItem label='Department:'>
								{selectedEmployee.department_data?.name || '-'}
							</ListItem>
							<ListItem label='Position:'>
								{selectedEmployee.position_type_data?.name || '-'}
							</ListItem>
							<ListItem label='Employment Type:'>
								{selectedEmployee.employment_type_data?.name || '-'}
							</ListItem>
							<ListItem label='Started Date'>{startedDate || '-'}</ListItem>
						</ul>
					</div>

					<Link
						href={`/evaluation/employee/${selectedEmployee.id}`}
						className='self-end'
					>
						<Button secondary>Start Evaluation</Button>
					</Link>
				</div>
			)}
		</>
	);
};
