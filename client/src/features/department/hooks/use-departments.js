import { nextAPI } from '@/lib/fetchApi';
import { useEffect, useState } from 'react';
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
					const newOptions = result.data?.map((department) => {
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
