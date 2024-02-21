import { serverAPI } from '@/lib/fetchApi';
import { getServerSideToken } from '@/util/session';

export async function GET(req, { params }) {
	const token = await getServerSideToken();

	if (!token) throw new Error('UnAuthenticated');

	const employeeId = params.employee_id;

	try {
		const res = await serverAPI(`/employees/${employeeId}`, {
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

export async function DELETE(req, { params }) {
	const token = await getServerSideToken();

	if (!token) throw new Error('UnAuthenticated');

	const employeeId = params.employee_id;

	try {
		const res = await serverAPI(`/employees/${employeeId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		if (!res.ok) {
			const error = new Error(`${res.status}: ${res.statusText}`);
			error.statusCode = res.status;
			throw error;
		}

		return Response.json({ deleted: true, error: null });
	} catch (error) {
		console.log(error);
		return new Response(
			JSON.stringify({ deleted: false, error: error.message }),
			{
				status: error.statusCode || 500,
			}
		);
	}
}
