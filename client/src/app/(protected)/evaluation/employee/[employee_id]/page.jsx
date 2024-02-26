import { fetchEmployee } from '@/features/employee/apis/employee';
import { EmployeeCard } from '@/features/evaluation/components/EmployeeCard';
import { EvaluationForm } from '@/features/evaluation/components/EvaluationForm';
import { customDateFormatter } from '@/util/date-formatter';
import { notFound } from 'next/navigation';

export const metadata = {
	title: 'Evaluation',
};

const EmployeeEvaluationPage = async ({ params }) => {
	const employeeId = params.employee_id;
	const result = await fetchEmployee(employeeId);
	const employee = result?.data;

	if (!employee) return notFound();

	const lastEvaluatedAt =
		employee?.evaluation_data &&
		customDateFormatter(employee.evaluation_data.date, 'yyyy-M-d');

	return (
		<>
			<section className='grid gap-4 md:gap-8'>
				<h1 className='section-title'>Evaluation</h1>

				<div className='max-w-[1000px] w-full mx-auto'>
					<EmployeeCard employee={employee} />
					{lastEvaluatedAt ? (
						<p className='my-6 md:mb-8 text-primary'>
							<span className='font-[500] text-text-gray'>
								** Last Evaluation:{' '}
							</span>
							{lastEvaluatedAt}
						</p>
					) : (
						<p className='my-6 md:mb-8 text-primary'>
							** This is the first evaluation
						</p>
					)}
					<EvaluationForm
						employeeId={employeeId}
						existingEvaluation={employee.evaluation_data}
					/>
				</div>
			</section>
		</>
	);
};

export default EmployeeEvaluationPage;
