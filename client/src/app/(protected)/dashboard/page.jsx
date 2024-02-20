'use client';
import { Fragment, useState } from 'react';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import {
	EmployeeCard,
	EmployeesTable,
} from '@/features/dashboard/components/EmployeesList';
import { EMPLOYEE_TYPE_OPTIONS, POSITION_OPTIONS } from '@/util/constants';
import OrderDropdown from '@/components/ui/dropdown/OrderDropdown';
import { useFetchEmployees } from '@/features/dashboard/hooks/use-employees';
import { CustomSkelton } from '@/components/ui/skelton/CustomSkelton';

const typeOptions = [{ key: '', value: 'All' }, ...EMPLOYEE_TYPE_OPTIONS];
const positionOptions = [{ key: '', value: 'All' }, ...POSITION_OPTIONS];

const DashboardPage = () => {
	const [sortType, setSortType] = useState(null);
	const [sortPosition, setSortPosition] = useState(null);
	const [sortOrder, setSortOrder] = useState(null);

	const { data, isLoading } = useFetchEmployees();
	const employees = !isLoading && data?.data;

	return (
		<>
			<section className='w-full max-w-[1000px] mx-auto'>
				<h1 className='section-title mb-6'>Employees List</h1>

				<div className='flex flex-wrap justify-between items-center gap-y-2 mb-4'>
					<div className='flex gap-3'>
						<Dropdown
							options={typeOptions}
							values={sortType}
							handleSetValue={(option) => setSortType(option)}
							initialText='Type'
							buttonClass='w-[100px]'
						/>
						<Dropdown
							options={positionOptions}
							values={sortPosition}
							handleSetValue={(option) => setSortPosition(option)}
							initialText='Position'
							buttonClass='w-[120px]'
						/>
					</div>
					<div className=''>
						<OrderDropdown values={sortOrder} setValue={setSortOrder} />
					</div>
				</div>

				<div className='md:hidden grid gap-2'>
					{isLoading && <CustomSkelton className='h-[250px] sm:h-[180px]' />}
					{!isLoading &&
						(employees?.length > 0 ? (
							employees.map((employee) => (
								<Fragment key={employee.id}>
									<EmployeeCard employee={employee} />
								</Fragment>
							))
						) : (
							<p>No list</p>
						))}
				</div>

				{isLoading && <CustomSkelton className='h-[180px]' />}
				{!isLoading && <EmployeesTable employees={employees} />}
			</section>
		</>
	);
};

export default DashboardPage;
