'use client';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import {
	EmployeeCard,
	EmployeesTable,
} from '@/features/dashboard/components/EmployeesList';

const DashboardPage = () => {
	return (
		<>
			<section className='w-full max-w-[1000px] mx-auto'>
				<h1 className='section-title mb-6'>Employees List</h1>

				{/* <Dropdown /> */}

				<div className='md:hidden'>
					<EmployeeCard />
				</div>
				<EmployeesTable />
			</section>
		</>
	);
};

export default DashboardPage;
