import { serverAPI } from '@/lib/fetchApi';
import { getServerSideToken } from '@/util/session';

export async function POST(req, { params }) {
	const token = await getServerSideToken();

	if (!token) throw new Error('UnAuthenticated');

	const employeeId = params.employee_id;
	const body = await req.json();

	try {
		const res = await serverAPI(`/employees/${employeeId}/evaluation`, {
			method: 'POST',
			headers: {
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		});

		if (!res.ok) {
			const result = await res.json();
			console.log(result);
			const error = new Error(`${res.status}: ${res.statusText}`);
			error.statusCode = res.status;
			throw error;
		}

		const result = await res.json();
		return Response.json({ data: result, error: null });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ data: null, error: error.message }), {
			status: error.statusCode || 500,
		});
	}
}
