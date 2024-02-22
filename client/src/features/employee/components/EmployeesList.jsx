'use client';
import { customDateFormatter } from '@/util/date-formatter';
import { ChevronIcon } from '@public/svgs';
import Link from 'next/link';

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
				<div className='flex justify-between'>
					<div className='flex flex-col gap-y-2 sm:flex-row sm:gap-x-16'>
						<DataItem label='First Name' dataClass='font-bold text-xl'>
							{employee.first_name || '-'}
						</DataItem>
						<DataItem label='Last Name' dataClass='font-bold text-xl'>
							{employee.last_name || '-'}
						</DataItem>
					</div>
					<Link
						href={`/employees/${employee.id}`}
						className='p-1 w-fit block hover:brightness-90 h-fit self-center text-white rounded-full bg-primary'
					>
						<ChevronIcon className='w-5 h-5 rotate-180' />
					</Link>
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
					<DataItem label='Started'>{startedAt || '-'}</DataItem>
				</div>
			</div>
		</>
	);
};

const TableHead = ({ children, className }) => {
	return (
		<th
			className={`text-white text-sm py-1 font-[500] ${
				className ? className : ''
			}`}
		>
			{children}
		</th>
	);
};

const TableData = ({ children, className }) => {
	return (
		<td
			className={`text-center border-t-[1px] py-3 ${
				className ? className : ''
			}`}
		>
			{children}
		</td>
	);
};

export const EmployeesTable = ({ employees }) => {
	return (
		<div className='max-md:hidden'>
			<table className='w-full min-w-[860px]'>
				<thead className='bg-primary'>
					<tr>
						<TableHead>First Name</TableHead>
						<TableHead>Last Name</TableHead>
						<TableHead className='w-[130px]'>Department</TableHead>
						<TableHead className='w-[130px]'>Type</TableHead>
						<TableHead className='w-[100px]'>Position</TableHead>
						<TableHead>Started</TableHead>
						<TableHead className='w-[90px]'></TableHead>
					</tr>
				</thead>
				<tbody>
					{employees?.length > 0 &&
						employees.map((employee) => {
							const startedAt = customDateFormatter(
								employee.hired_date,
								'yyyy-M-d'
							);
							return (
								<tr key={employee.id} className='bg-white'>
									<TableData className='font-[500]'>
										{employee.first_name || '-'}
									</TableData>
									<TableData className='font-[500]'>
										{employee.last_name || '-'}
									</TableData>
									<TableData>{employee.department_data?.name || '-'}</TableData>
									<TableData>
										{employee.employment_type_data?.name || '-'}
									</TableData>
									<TableData>{employee.position_data?.name || '-'}</TableData>
									<TableData>{startedAt || '-'}</TableData>
									<TableData>
										<Link
											href={`/employees/${employee.id}`}
											className='block w-fit mx-auto text-xs bg-primary text-white py-1 px-3 rounded-md hover:brightness-90'
										>
											<ChevronIcon className='w-4 h-4 rotate-180' />
										</Link>
									</TableData>
								</tr>
							);
						})}
				</tbody>
			</table>

			{employees?.length === 0 && (
				<p className='text-center text-lg my-10 text-text-secondary'>No List</p>
			)}
		</div>
	);
};
