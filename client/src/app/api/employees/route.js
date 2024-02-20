import { serverAPI } from '@/lib/fetchApi';
import { getServerSideToken } from '@/util/session';

export async function GET(req) {
	const token = await getServerSideToken();

	if (!token) throw new Error('UnAuthenticated');

	try {
		const res = await serverAPI(`/employees`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		if (!res.ok) {
			const error = new Error(`${res.status}: ${res.statusText}`);
			error.statusCode = res.status;
			throw error;
		}

		const result = await res.json();
		return Response.json(result);
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(null), {
			status: error.statusCode || 500,
		});
	}
}
