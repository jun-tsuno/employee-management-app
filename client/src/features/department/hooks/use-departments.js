import { nextAPI } from '@/lib/fetchApi';
import { useEffect, useState, useCallback } from 'react';
import useSWR from 'swr';

export const useFetchDepartments = () =>
	useSWR('/employees/departments', async (url) => {
		const res = await nextAPI(url);
		const result = await res.json();
		return result;
	});

export const useDepartmentOptions = () => {
	const [options, setOptions] = useState();

	useEffect(() => {
		const fetchDepartments = async () => {
			try {
				const res = await nextAPI('/employees/departments');

				if (!res.ok) throw new Error();
				const result = await res.json();

				if (result) {
					const newOptions = result?.map((department) => {
						return { key: department.id, value: department.name };
					});
					setOptions(newOptions);
				}
			} catch (error) {
				setOptions([]);
			}
		};
		fetchDepartments();
	}, []);

	return { options };
};

export const useCreateDepartment = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const createDepartment = useCallback(async (data) => {
		setIsLoading(true);
		setError('');

		try {
			const res = await nextAPI('/employees/departments', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			setIsLoading(false);
			const result = await res.json();

			if (!result.created) throw new Error(result.error);

			return { created: result.created, error: '' };
		} catch (error) {
			setIsLoading(false);
			setError(error.message || 'Fail to create Employee');
			return {
				created: null,
				error: error.message,
			};
		}
	});

	return { isLoading, error, createDepartment };
};
