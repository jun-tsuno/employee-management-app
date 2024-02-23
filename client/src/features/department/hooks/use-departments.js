import { nextAPI } from '@/lib/fetchApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useSWRConfig } from 'swr';
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

export const useDeleteDepartment = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { mutate } = useSWRConfig();
	const router = useRouter();

	const deleteDepartment = useCallback(async (departmentId) => {
		setIsLoading(true);
		setError('');

		try {
			const res = await nextAPI(`/employees/departments/${departmentId}`, {
				method: 'DELETE',
			});

			setIsLoading(false);
			const result = await res.json();

			if (!result.deleted) throw new Error(result.error);
			mutate('/employees/departments');
			router.refresh();

			return { deleted: true, error: '' };
		} catch (error) {
			setIsLoading(false);
			setError(error.message || 'Fail to create Employee');
			return {
				deleted: false,
				error: error.message,
			};
		}
	});

	return { isLoading, error, deleteDepartment };
};
