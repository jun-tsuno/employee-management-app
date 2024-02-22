'use client';
import { Fragment, useState } from 'react';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import {
	EmployeeCard,
	EmployeesTable,
} from '@/features/employee/components/EmployeesList';
import { EMPLOYEE_TYPE_OPTIONS, POSITION_OPTIONS } from '@/util/constants';
import OrderDropdown from '@/components/ui/dropdown/OrderDropdown';
import { useFetchEmployees } from '@/features/employee/hooks/use-employees';
import { CustomSkelton } from '@/components/ui/skelton/CustomSkelton';
import { AddEmployeeLink } from '@/components/ui/link/CustomLinks';
import CustomPagination from '@/components/ui/pagenation/CustomPagination';

const typeOptions = [{ key: '', value: 'All' }, ...EMPLOYEE_TYPE_OPTIONS];
const positionOptions = [{ key: '', value: 'All' }, ...POSITION_OPTIONS];

const EmployeesPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [sortType, setSortType] = useState(null);
	const [sortPosition, setSortPosition] = useState(null);
	const [sortOrder, setSortOrder] = useState(null);

	const { data, isLoading } = useFetchEmployees({
		employmentType: sortType?.key,
		position: sortPosition?.key,
		orderBy: sortOrder?.key,
		page: currentPage,
	});

	const employees = !isLoading && data?.data?.results;
	const totalCount = !isLoading && data?.data?.total_count;

	return (
		<>
			<section className='w-full max-w-[1000px] mx-auto'>
				<div className='flex items-center justify-between flex-wrap mb-12'>
					<h1 className='section-title'>Employees List</h1>
					<AddEmployeeLink />
				</div>

				<div className='flex flex-wrap justify-between items-center gap-y-2 mb-4'>
					<div className='flex gap-3'>
						<Dropdown
							options={typeOptions}
							values={sortType}
							handleSetValue={(option) => setSortType(option)}
							initialText='Type'
							buttonClass='min-w-[100px]'
						/>
						<Dropdown
							options={positionOptions}
							values={sortPosition}
							handleSetValue={(option) => setSortPosition(option)}
							initialText='Position'
							buttonClass='min-w-[120px]'
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
							<p className='my-8 text-lg text-text-secondary text-center'>
								No list
							</p>
						))}
				</div>

				{isLoading && <CustomSkelton className='h-[180px]' />}
				{!isLoading && <EmployeesTable employees={employees} />}

				<CustomPagination
					totalCount={totalCount}
					setCurrentPage={setCurrentPage}
					className='mt-8 md:mt-12'
				/>
			</section>
		</>
	);
};

export default EmployeesPage;
