export const serverAPI = (endpoint, options) => {
	const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

	const defaultHeaders = {
		'Content-Type': 'application/json',
	};

	const requestOptions = {
		...options,
		headers: {
			...defaultHeaders,
			...(options?.headers || {}),
		},
	};

	return fetch(`${baseUrl}${endpoint}`, requestOptions);
};

export const nextAPI = (endpoint, options) => {
	const baseUrl = process.env.NEXT_PUBLIC_NEXT_BASE_URL;

	const defaultHeaders = {
		'Content-Type': 'application/json',
	};

	const requestOptions = {
		...options,
		headers: {
			...defaultHeaders,
			...(options?.headers || {}),
		},
	};

	return fetch(`${baseUrl}/api${endpoint}`, requestOptions);
};
