import { CrossIcon } from '@public/svgs';
import { SearchEmployee } from './SearchEmployee';

export const SelectHead = ({ selectedEmployee, setSelectedEmployee }) => {
	const handleRemove = () => {
		setSelectedEmployee(null);
	};

	return (
		<>
			<SearchEmployee
				selectedEmployee={selectedEmployee}
				setSelectedEmployee={setSelectedEmployee}
			/>

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
