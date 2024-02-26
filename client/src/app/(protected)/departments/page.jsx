import {
	AddDepartmentCard,
	DepartmentCard,
} from '@/features/department/components/DepartmentCard';
import { fetchDepartments } from '@/features/department/apis/department';

const DepartmentPage = async () => {
	const result = await fetchDepartments();
	const departments = result?.data;

	return (
		<>
			<section className='grid gap-6 md:gap-12'>
				<h1 className='section-title'>Departments</h1>

				<div className='grid gap-3 sm:grid-cols-2 lg:gap-5 md:grid-cols-1 lg:grid-cols-2'>
					{departments &&
						departments.map((department) => (
							<DepartmentCard key={department.id} department={department} />
						))}
					<AddDepartmentCard />
				</div>
			</section>
		</>
	);
};

export default DepartmentPage;
