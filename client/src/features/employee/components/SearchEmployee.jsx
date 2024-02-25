'use client';
import { useState } from 'react';
import { useSearchEmployees } from '../hooks/use-search-employees';
import SearchInput from '@/components/ui/input/SearchInput';
import { CrossIcon } from '@public/svgs';

export const SearchEmployee = ({ selectedEmployee, setSelectedEmployee }) => {
	const { setSearchTerm, matchedEmployees, isLoading } = useSearchEmployees();

	const handleSelect = (employee) => {
		setSearchTerm('');
		setSelectedEmployee(employee);
	};

	const handleRemove = () => {
		setSearchTerm('');
		setSelectedEmployee(null);
	};

	return (
		<>
			<div className='bg-text-placeholder p-4 rounded-lg relative'>
				<SearchInput setTerm={setSearchTerm} />

				{!isLoading && !selectedEmployee && matchedEmployees?.length > 0 && (
					<ul className='absolute w-[80%] overflow-y-auto max-h-[350px] py-4 space-y-3 bg-white shadow-lg border-[1px] rounded-md'>
						{matchedEmployees.map((employee) => (
							<li
								key={employee.id}
								onClick={() => handleSelect(employee)}
								className='hover:bg-primary py-1 px-2 sm:px-4 hover:cursor-pointer hover:text-white'
							>
								<p>{`${employee.first_name} ${employee.last_name}` || '-'}</p>
								<p className='line-clamp-1 text-sm'>
									{employee.employee_number || '-'}
								</p>
							</li>
						))}
					</ul>
				)}
			</div>

			{selectedEmployee && (
				<section className='space-y-2 my-10'>
					<h3 className='text-text-secondary'>Next Head</h3>
					<div className='border-[1px] flex flex-wrap flex-row-reverse justify-between border-primary-tint p-4 rounded-md'>
						<button
							onClick={handleRemove}
							className='bg-text-placeholder p-1 w-8 flex items-center justify-center h-8 rounded-full hover:bg-error hover:text-white'
						>
							<CrossIcon className='w-5 h-5' />
						</button>
						<ul>
							<li className='text-text-gray font-bold sm:text-xl'>{`${selectedEmployee.first_name} ${selectedEmployee.last_name}`}</li>
							<li className='flex items-center gap-3'>
								<span className='text-sm text-text-secondary'>ID:</span>
								<span>{selectedEmployee.employee_number}</span>
							</li>
						</ul>
					</div>
				</section>
			)}
		</>
	);
};
