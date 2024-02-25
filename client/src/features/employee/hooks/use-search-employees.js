import { nextAPI } from '@/lib/fetchApi';
import { useState, useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';

export const useSearchEmployees = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [matchedEmployees, setMatchedEmployees] = useState([]);

	const { data, isLoading } = useSWRImmutable(
		searchTerm ? `/employees?q=${searchTerm}&page=1` : null,
		async (url) => {
			const res = await nextAPI(url);
			const result = await res.json();
			return result;
		}
	);

	useEffect(() => {
		if (data) {
			setMatchedEmployees(data.data?.results);
		}
		if (!searchTerm) {
			setMatchedEmployees([]);
		}
	}, [data, searchTerm]);

	return {
		setSearchTerm,
		matchedEmployees,
		isLoading,
	};
};
