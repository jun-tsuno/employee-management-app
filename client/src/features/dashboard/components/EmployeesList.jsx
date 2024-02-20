'use client';
import { ChevronIcon } from '@public/svgs';

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

export const EmployeeCard = () => {
	return (
		<>
			<div className='bg-white w-full p-4 rounded-lg shadow-md grid gap-4'>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-y-2 sm:flex-row sm:gap-x-16'>
						<DataItem label='First Name' dataClass='font-bold text-xl'>
							John
						</DataItem>
						<DataItem label='Last Name' dataClass='font-bold text-xl'>
							Doe
						</DataItem>
					</div>
					<button className='p-1 w-fit hover:brightness-90 h-fit self-center text-white rounded-full bg-primary'>
						<ChevronIcon className='w-5 h-5 rotate-180' />
					</button>
				</div>

				<div className='flex flex-wrap gap-x-16 gap-y-4'>
					<DataItem label='Department'>HR</DataItem>
					<DataItem label='Type'>Full Time</DataItem>
					<DataItem label='On Leave'>-</DataItem>
					<DataItem label='Started'>2023-1-1</DataItem>
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

export const EmployeesTable = () => {
	return (
		<div className='max-md:hidden'>
			<table className='w-full min-w-[860px]'>
				<thead className='bg-primary'>
					<tr>
						<TableHead>First Name</TableHead>
						<TableHead>Last Name</TableHead>
						<TableHead className='w-[130px]'>Department</TableHead>
						<TableHead className='w-[130px]'>Type</TableHead>
						<TableHead className='w-[100px]'>On Leave</TableHead>
						<TableHead>Started</TableHead>
						<TableHead className='w-[90px]'></TableHead>
					</tr>
				</thead>
				<tbody>
					<tr className='bg-white'>
						<TableData>John</TableData>
						<TableData>Doe</TableData>
						<TableData>hgowhgowhgowhow</TableData>
						<TableData>HR</TableData>
						<TableData>Staff</TableData>
						<TableData>2023-1-1</TableData>
						<TableData>Detail</TableData>
					</tr>
					<tr className='bg-white'>
						<TableData>John</TableData>
						<TableData>Doe</TableData>
						<TableData>hgowhgowhgowhow</TableData>
						<TableData>HR</TableData>
						<TableData>Staff</TableData>
						<TableData>2023-1-1</TableData>
						<TableData>Detail</TableData>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
