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
	{ key: EMPLOYMENT_TYPE.STAFF, value: 'Freelance' },
];

export const POSITION_OPTIONS = [
	{ key: POSITIONS.MANAGER, value: 'Manager' },
	{ key: POSITIONS.HEAD, value: 'Head' },
	{ key: POSITIONS.LEADER, value: 'Leader' },
	{ key: POSITIONS.STAFF, value: 'STAFF' },
];

export const ORDER_OPTIONS = [
	{ key: 'dec', value: 'Latest' },
	{ key: 'asc', value: 'Oldest' },
];
