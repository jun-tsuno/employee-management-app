import Image from 'next/image';
import { AddEmployeeForm } from '@/features/employee/components/EmployeeForms';

export const metadata = {
	title: 'Add Employee',
};

const CreateEmployeePage = () => {
	return (
		<>
			<section className='mb-20 md:mb-40'>
				<h1 className='section-title'>Add New Employee</h1>

				<div className='mt-10 lg:mt-20 flex xl:gap-12 flex-col max-w-[900px] mx-auto md:gap-8 gap-4 lg:flex-row'>
					<figure className='bg-text-placeholder mx-auto p-3 rounded-full aspect-square w-[100px] h-[100px] min-w-fit flex items-center justify-center'>
						<Image
							src='/svgs/Employee.svg'
							alt='employee image'
							width={0}
							height={0}
							sizes='100vw'
							className='object-cover w-[70%]'
						/>
					</figure>
					<div className='md:grow'>
						<AddEmployeeForm />
					</div>
				</div>
			</section>
		</>
	);
};

export default CreateEmployeePage;
