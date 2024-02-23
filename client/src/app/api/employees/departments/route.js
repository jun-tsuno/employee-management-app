import { serverAPI } from '@/lib/fetchApi';
import { getServerSideToken } from '@/util/session';

export async function GET(req) {
	const token = await getServerSideToken();

	if (!token) throw new Error('UnAuthenticated');

	try {
		const res = await serverAPI('/employees/departments', {
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

export async function POST(req) {
	const token = await getServerSideToken();

	if (!token) throw new Error('UnAuthenticated');

	const body = await req.json();

	try {
		const res = await serverAPI('/employees/departments', {
			method: 'POST',
			headers: {
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		});

		if (!res.ok) {
			const error = new Error(`${res.status}: ${res.statusText}`);
			error.statusCode = res.status;
			throw error;
		}

		const result = await res.json();
		return Response.json({ created: result, error: null });
	} catch (error) {
		console.log(error);
		return new Response(
			JSON.stringify({ created: null, error: error.message }),
			{
				status: error.statusCode || 500,
			}
		);
	}
}
