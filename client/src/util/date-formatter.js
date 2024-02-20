import { format } from 'date-fns';

export const customDateFormatter = (date, dateFormat) => {
	if (!date) return null;

	const formatString = dateFormat || 'yyyy-M-d';
	const formattedDate = format(new Date(date), formatString);
	return formattedDate;
};
