import { customDateFormatter } from '@/util/date-formatter';

const DataItem = ({ label, children, dataClass }) => {
	return (
		<dl>
			<dt className='text-sm text-text-secondary font-[500]'>{label}</dt>
			<dd className={`text-text-gray ${dataClass ? dataClass : ''}`}>
				{children}
			</dd>
		</dl>
	);
};

export const EmployeeCard = ({ employee }) => {
	const startedAt = customDateFormatter(employee.hired_date, 'yyyy-M-d');

	return (
		<>
			<div className='bg-white w-full p-4 rounded-lg shadow-md grid gap-4'>
				<div className='flex flex-col gap-y-2 sm:flex-row sm:gap-x-16'>
					<DataItem label='First Name' dataClass='font-bold text-xl'>
						{employee.first_name || '-'}
					</DataItem>
					<DataItem label='Last Name' dataClass='font-bold text-xl'>
						{employee.last_name || '-'}
					</DataItem>
				</div>

				<div className='flex flex-wrap gap-x-16 gap-y-4'>
					<DataItem label='Department'>
						{employee.department_data?.name || '-'}
					</DataItem>
					<DataItem label='Type'>
						{employee.employment_type_data?.name || '-'}
					</DataItem>
					<DataItem label='Position'>
						{employee.position_data?.name || '-'}
					</DataItem>
					<DataItem label='Salary'>{employee.salary || '-'}</DataItem>
					<DataItem label='Started'>{startedAt || '-'}</DataItem>
				</div>
			</div>
		</>
	);
};
