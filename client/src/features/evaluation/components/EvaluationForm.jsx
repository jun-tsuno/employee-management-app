'use client';
import { useState } from 'react';
import { useMutateEvaluation } from '../hooks/use-evaluation';
import { showErrorToast } from '@/components/ui/toast/Toast';
import { EvaluationSuccessModal } from './EvaluationModals';
import NumberPicker from '@/components/ui/picker/NumberPicker';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';

export const EvaluationForm = ({ employeeId, existingEvaluation }) => {
	const [formData, setFormData] = useState({
		performance: existingEvaluation?.performance || 0,
		communication: existingEvaluation?.communication || 0,
		problem_solving: existingEvaluation?.problem_solving || 0,
		team_work: existingEvaluation?.team_work || 0,
		adaptability: existingEvaluation?.adaptability || 0,
		comment: existingEvaluation?.comment || '',
	});
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const { isLoading, createEvaluation, updateEvaluation } =
		useMutateEvaluation();

	const handleRatingChange = (key, number) => {
		setFormData({
			...formData,
			[key]: number,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (existingEvaluation) {
			const result = await updateEvaluation({
				employeeId,
				evaluationId: existingEvaluation.id,
				data: formData,
			});
			if (!result.updated) return showErrorToast(result.error);
		} else {
			const result = await createEvaluation({ employeeId, data: formData });
			if (!result.created) return showErrorToast(result.error);
		}

		setShowSuccessModal(true);
	};

	return (
		<>
			<div className='mt-6'>
				<form onSubmit={handleSubmit} className='grid gap-6'>
					<div className='grid gap-x-3 gap-y-6 md:grid-cols-2'>
						<NumberPicker
							label='Performance'
							handleSelect={(number) =>
								handleRatingChange('performance', number)
							}
							initial={formData.performance}
						/>
						<NumberPicker
							label='Communication'
							handleSelect={(number) =>
								handleRatingChange('communication', number)
							}
							initial={formData.communication}
						/>
						<NumberPicker
							label='Problem Solving'
							handleSelect={(number) =>
								handleRatingChange('problem_solving', number)
							}
							initial={formData.problem_solving}
						/>
						<NumberPicker
							label='Team Work'
							handleSelect={(number) => handleRatingChange('team_work', number)}
							initial={formData.team_work}
						/>
						<NumberPicker
							label='Adaptability'
							handleSelect={(number) =>
								handleRatingChange('adaptability', number)
							}
							initial={formData.adaptability}
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label
							className='text-text-gray font-[500]'
							htmlFor='evaluation-comment'
						>
							Comment<span className='text-xs'> (optional / max 500 char)</span>
						</label>
						<textarea
							id='evaluation-comment'
							value={formData.comment}
							onChange={(e) =>
								setFormData({ ...formData, comment: e.target.value })
							}
							className='rounded-md resize-none overflow-y-auto focus:outline-none p-4 h-[200px]'
						/>
					</div>

					<div className='flex items-center gap-3 justify-end flex-wrap'>
						<Link href='/evaluation'>
							<Button cancel>Evaluate another employee</Button>
						</Link>
						<Button type='submit' secondary disabled={isLoading}>
							Submit Evaluation
						</Button>
					</div>
				</form>
			</div>

			{showSuccessModal && <EvaluationSuccessModal employeeId={employeeId} />}
		</>
	);
};
