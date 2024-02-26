import { fetchEmployee } from '@/features/employee/apis/employee';
import {
	DeleteEmployeeModal,
	EditEmployeeModal,
	EmployeeDataItem,
	SectionWrapper,
} from '@/features/employee/components/EmployeeDetail';
import {
	EvaluationDetail,
	NoEvaluation,
} from '@/features/employee/components/EmployeeEvaluation';
import { customDateFormatter } from '@/util/date-formatter';
import { notFound } from 'next/navigation';
import Image from 'next/image';

const EmployeeDetailPage = async ({ params }) => {
	const employeeId = params.employee_id;

	const result = await fetchEmployee(employeeId);
	if (!result.data) return notFound();

	const employee = result.data;
	const startedAt = customDateFormatter(employee?.hired_date, 'yyyy-M-d');

	return (
		<>
			<section>
				<div className='mb-8 md:mb-12 items-center flex flex-wrap justify-between'>
					<h1 className='section-title'>Employee Detail</h1>
					<EditEmployeeModal employee={employee} />
				</div>

				<div className='flex flex-col gap-4 lg:flex-row'>
					<figure className='w-[80px] md:w-[120px] md:h-[120px] bg-text-placeholder rounded-full flex items-center justify-center h-[80px] mx-auto'>
						<Image
							src='/svgs/Employee.svg'
							alt='employee image'
							width={0}
							height={0}
							sizes='100vw'
							className='w-[70%] object-cover'
						/>
					</figure>

					{employee && (
						<div className='lg:grow grid gap-4 md:gap-6 max-w-[800px]'>
							<div className='bg-text-placeholder rounded-md shadow-md'>
								<SectionWrapper title='Basic Information'>
									<div className='space-y-4 md:px-8 px-4 md:space-y-8'>
										<div className='flex flex-col gap-4 md:flex-row md:items-center md:gap-20'>
											<EmployeeDataItem label='First Name'>
												{employee.first_name || '-'}
											</EmployeeDataItem>
											<EmployeeDataItem label='Last Name'>
												{employee.last_name || '-'}
											</EmployeeDataItem>
										</div>
										<div className='flex flex-wrap gap-y-4 gap-x-12'>
											<EmployeeDataItem label='ID'>
												{employee.employee_number || '-'}
											</EmployeeDataItem>
											<EmployeeDataItem label='Email'>
												{employee.email || '-'}
											</EmployeeDataItem>
											<EmployeeDataItem label='Tel'>
												{employee.tel || '-'}
											</EmployeeDataItem>
										</div>
									</div>
								</SectionWrapper>
								<SectionWrapper title='Employment Information'>
									<div className='space-y-4 px-4 md:px-8 md:space-y-8'>
										<div className='flex flex-wrap gap-y-4 gap-x-14'>
											<EmployeeDataItem label='Employment Type'>
												{employee.employment_type_data?.name || '-'}
											</EmployeeDataItem>
											<EmployeeDataItem label='Department'>
												{employee.department_data?.name || '-'}
											</EmployeeDataItem>
											<EmployeeDataItem label='Position'>
												{employee.position_data?.name || '-'}
											</EmployeeDataItem>
										</div>
										<div className='flex flex-col gap-4 md:flex-row md:gap-12'>
											<EmployeeDataItem label='Salary'>
												${employee.salary?.toLocaleString() || '-'}
											</EmployeeDataItem>
											<EmployeeDataItem label='Started'>
												{startedAt || '-'}
											</EmployeeDataItem>
										</div>
									</div>
								</SectionWrapper>
								<SectionWrapper title='Evaluation'>
									{employee.evaluation_data ? (
										<EvaluationDetail
											evaluationData={employee.evaluation_data}
											employeeId={employee.id}
										/>
									) : (
										<NoEvaluation employeeId={employee.id} />
									)}
								</SectionWrapper>
							</div>

							<DeleteEmployeeModal employeeId={employee.id} />
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default EmployeeDetailPage;
