import { serverAPI } from '@/lib/fetchApi';
import { getServerSideToken } from '@/util/session';

export async function GET(req) {
	const token = await getServerSideToken();

	if (!token) throw new Error('UnAuthenticated');

	const searchParams = req.nextUrl.searchParams;
	const employmentType = searchParams.get('employment_type');
	const position = searchParams.get('position');
	const orderBy = searchParams.get('order_by');

	const queryParams = new URLSearchParams();
	if (employmentType) queryParams.append('employment_type', employmentType);
	if (position) queryParams.append('position', position);
	if (orderBy) queryParams.append('order_by', orderBy);

	try {
		const res = await serverAPI(`/employees?${queryParams}`, {
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
		return Response.json({ data: result, error: null });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ data: null, error: error.message }), {
			status: error.statusCode || 500,
		});
	}
}

export async function POST(req) {
	const token = await getServerSideToken();

	if (!token) throw new Error('UnAuthenticated');

	const body = await req.json();

	try {
		const res = await serverAPI('/employees/', {
			method: 'POST',
			headers: {
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		});

		const result = await res.json();

		if (!res.ok) {
			let message;
			if (result.email) {
				message = 'This email is already exists';
			} else {
				message = res.statusText;
			}
			const error = new Error(`${message}`);
			error.statusCode = res.status;
			throw error;
		}
		return Response.json(result);
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: error.message }), {
			status: error.statusCode || 500,
		});
	}
}
