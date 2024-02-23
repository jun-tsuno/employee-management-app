import { serverAPI } from '@/lib/fetchApi';
import { getServerSideToken } from '@/util/session';

export async function PATCH(req, { params }) {
	const token = await getServerSideToken();
	if (!token) throw new Error('UnAuthenticated');

	const departmentId = params.department_id;
	const body = await req.json();

	try {
		const res = await serverAPI(`/employees/departments/${departmentId}`, {
			method: 'PATCH',
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
		return Response.json({ updated: result, error: null });
	} catch (error) {
		console.log(error);
		return new Response(
			JSON.stringify({ updated: null, error: error.message }),
			{
				status: error.statusCode || 500,
			}
		);
	}
}

export async function DELETE(req, { params }) {
	const token = await getServerSideToken();
	if (!token) throw new Error('UnAuthenticated');

	const departmentId = params.department_id;

	try {
		const res = await serverAPI(`/employees/departments/${departmentId}`, {
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
