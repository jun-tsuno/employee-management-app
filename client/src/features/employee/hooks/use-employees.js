import { nextAPI } from '@/lib/fetchApi';
import { useCallback, useState } from 'react';
import useSWR from 'swr';

export const useFetchEmployees = ({ employmentType, position, orderBy }) => {
	const queryParams = new URLSearchParams();
	if (employmentType) queryParams.append('employment_type', employmentType);
	if (position) queryParams.append('position', position);
	if (orderBy) queryParams.append('order_by', orderBy);

	return useSWR(`/employees?${queryParams}`, async (url) => {
		const res = await nextAPI(url);
		const result = await res.json();
		return result;
	});
};

export const useCreateEmployee = () => {
	const [isLoading, setIsLoading] = useState(false);

	const createEmployee = useCallback(async (data) => {
		setIsLoading(true);

		try {
			const res = await nextAPI('/employees', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			setIsLoading(false);
			const result = await res.json();

			if (!res.ok) throw new Error(result.message);

			return { created: result, error: '' };
		} catch (error) {
			setIsLoading(false);
			return {
				created: null,
				error: error.message || 'Fail to create Employee',
			};
		}
	});

	return { isLoading, createEmployee };
};
