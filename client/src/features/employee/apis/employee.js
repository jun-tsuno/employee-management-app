import { serverAPI } from '@/lib/fetchApi';
import { getServerSideToken } from '@/util/session';

/*
server-side fetching
*/

export const fetchEmployee = async (employeeId) => {
	const token = await getServerSideToken();

	if (!token) throw new Error('UnAuthorized');

	try {
		const res = await serverAPI(`/employees/${employeeId}`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);

		const result = await res.json();
		return { data: result, error: null };
	} catch (error) {
		console.log(error);
		return { data: null, error: error.message };
	}
};
