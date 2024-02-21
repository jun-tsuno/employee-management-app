export const EMPLOYMENT_TYPE = {
	FULL_TIME: 'full_time',
	PART_TIME: 'part_time',
	CONTRACT: 'contract',
	FREELANCE: 'freelance',
};

export const POSITIONS = {
	MANAGER: 'manager',
	HEAD: 'head',
	LEADER: 'leader',
	STAFF: 'staff',
};

export const EMPLOYEE_TYPE_OPTIONS = [
	{ key: EMPLOYMENT_TYPE.FULL_TIME, value: 'Full-time' },
	{ key: EMPLOYMENT_TYPE.PART_TIME, value: 'Part-time' },
	{ key: EMPLOYMENT_TYPE.CONTRACT, value: 'Contract' },
	{ key: EMPLOYMENT_TYPE.FREELANCE, value: 'Freelance' },
];

export const POSITION_OPTIONS = [
	{ key: 1, value: 'Manager' },
	{ key: 2, value: 'Head' },
	{ key: 3, value: 'Leader' },
	{ key: 4, value: 'Staff' },
];

export const ORDER_OPTIONS = [
	{ key: 'dec', value: 'Latest' },
	{ key: 'asc', value: 'Oldest' },
];

export const DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}$/;
