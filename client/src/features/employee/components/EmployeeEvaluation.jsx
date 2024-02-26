'use client';
import { EmployeeDataItem } from './EmployeeDetail';
import { customDateFormatter } from '@/util/date-formatter';
import Button from '@/components/ui/button/Button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const EvaluationRadarChart = dynamic(
	() =>
		import('@/features/employee/components/EvaluationChart').then(
			(module) => module.EvaluationRadarChart
		),
	{
		ssr: false,
	}
);

export const NoEvaluation = ({ employeeId }) => {
	return (
		<div className='flex items-center justify-between px-4 md:px-8 py-4 flex-wrap'>
			<p>No evaluation</p>
			<Link href={`/evaluation/employee/${employeeId}`} prefetch={false}>
				<Button secondary>Start Evaluation</Button>
			</Link>
		</div>
	);
};

export const EvaluationDetail = ({ evaluationData, employeeId }) => {
	const evaluatedAt = customDateFormatter(evaluationData.date, 'yyyy-M-d');

	return (
		<div className='px-4 md:px-8'>
			<div className='flex items-center flex-wrap justify-between'>
				<EmployeeDataItem label='Last Evaluated'>
					{evaluatedAt || '-'}
				</EmployeeDataItem>
				<Link href={`/evaluation/employee/${employeeId}`} prefetch={false}>
					<Button secondary>Update evaluation</Button>
				</Link>
			</div>

			<EvaluationRadarChart evaluationData={evaluationData} />
			<dl className='border-[1px] rounded-md border-gray-300'>
				<dt className='py-[2px] bg-gray-300 text-text-gray font-[500] px-4 text-sm border-b-[1px] border-gray-300'>
					Comment
				</dt>
				<dd className='p-4'>{evaluationData?.comment || '-'}</dd>
			</dl>
		</div>
	);
};
