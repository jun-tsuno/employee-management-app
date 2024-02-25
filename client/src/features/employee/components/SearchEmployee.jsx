'use client';
import { useSearchEmployees } from '../hooks/use-search-employees';
import SearchInput from '@/components/ui/input/SearchInput';

export const SearchEmployee = ({
	selectedEmployee,
	setSelectedEmployee,
	className,
}) => {
	const { setSearchTerm, matchedEmployees, isLoading } = useSearchEmployees();

	const handleSelect = (employee) => {
		setSearchTerm('');
		setSelectedEmployee(employee);
	};

	return (
		<>
			<div
				className={`bg-text-placeholder p-4 rounded-lg relative ${
					className ? className : ''
				}`}
			>
				<SearchInput setTerm={setSearchTerm} placeholder='search name...' />

				{!isLoading && matchedEmployees?.length > 0 && (
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
		</>
	);
};
