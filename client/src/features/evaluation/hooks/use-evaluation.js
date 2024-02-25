import { useState, useCallback } from 'react';
import { nextAPI } from '@/lib/fetchApi';

export const useMutateEvaluation = () => {
	const [isLoading, setIsLoading] = useState(false);

	const createEvaluation = useCallback(async ({ employeeId, data }) => {
		setIsLoading(true);

		try {
			const res = await nextAPI(`/employees/${employeeId}/evaluation`, {
				method: 'POST',
				body: JSON.stringify(data),
			});

			setIsLoading(false);
			const result = await res.json();

			if (!res.ok) throw new Error(result.error);

			return { created: result, error: '' };
		} catch (error) {
			setIsLoading(false);
			return {
				created: null,
				error: error.message || 'Fail to create Evaluation',
			};
		}
	});

	const updateEvaluation = useCallback(
		async ({ employeeId, evaluationId, data }) => {
			setIsLoading(true);

			try {
				const res = await nextAPI(
					`/employees/${employeeId}/evaluation/${evaluationId}`,
					{
						method: 'PATCH',
						body: JSON.stringify(data),
					}
				);

				setIsLoading(false);
				const result = await res.json();

				if (!res.ok) throw new Error(result.error);

				return { updated: result, error: '' };
			} catch (error) {
				setIsLoading(false);
				return {
					updated: null,
					error: error.message || 'Fail to update Evaluation',
				};
			}
		}
	);

	return { isLoading, createEvaluation, updateEvaluation };
};
