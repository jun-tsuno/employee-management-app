import { nextAPI } from '@/lib/fetchApi';
import { useCallback, useState } from 'react';
import useSWR from 'swr';

export const mapOrder = {
	dec: '-hired_date',
	asc: 'hired_date',
};

export const useFetchEmployees = ({
	employmentType,
	position,
	order,
	page,
	q,
}) => {
	const queryParams = new URLSearchParams();
	if (employmentType) queryParams.append('employment_type', employmentType);
	if (position) queryParams.append('position', position);
	if (order) queryParams.append('order', mapOrder[order]);
	if (page) queryParams.append('page', page);
	if (q) queryParams.append('q', q);

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

export const useFetchEmployee = (employeeId) =>
	useSWR(`/employees/${employeeId}`, async (url) => {
		const res = await nextAPI(url);
		const result = await res.json();
		return result;
	});

export const useDeleteEmployee = () => {
	const [isLoading, setIsLoading] = useState(false);

	const deleteEmployee = async (employeeId) => {
		try {
			const res = await nextAPI(`/employees/${employeeId}`, {
				method: 'DELETE',
			});

			setIsLoading(false);
			const result = await res.json();

			if (!result.deleted) throw new Error(result.error);

			return { deleted: true, error: '' };
		} catch (error) {
			setIsLoading(false);
			return {
				deleted: false,
				error: error.message || 'Fail to delete Employee',
			};
		}
	};

	return { isLoading, deleteEmployee };
};

export const useUpdateEmployee = () => {
	const [isLoading, setIsLoading] = useState(false);

	const updateEmployee = async ({ employeeId, data }) => {
		try {
			const res = await nextAPI(`/employees/${employeeId}`, {
				method: 'PATCH',
				body: JSON.stringify(data),
			});

			setIsLoading(false);

			const result = await res.json();
			if (!result.updated) throw new Error(result.error);

			return { updated: true, error: '' };
		} catch (error) {
			setIsLoading(false);
			return {
				updated: false,
				error: error.message || 'Fail to delete Employee',
			};
		}
	};

	return { isLoading, updateEmployee };
};
