import { nextAPI } from '@/lib/fetchApi';
import useSWR from 'swr';

export const useFetchEmployees = () => {
	return useSWR('/employees', async (url) => {
		const res = await nextAPI(url);
		const result = await res.json();
		return result;
	});
};
