import { SelectEvaluationTarget } from '@/features/evaluation/components/SelectEvaluationTarget';

export const metadata = {
	title: 'Evaluate',
};

const EvaluationPage = () => {
	return (
		<>
			<section>
				<h1 className='section-title'>Evaluation</h1>

				<p className='text-text-secondary my-4'>Select an employee...</p>
				<SelectEvaluationTarget />
			</section>
		</>
	);
};

export default EvaluationPage;
