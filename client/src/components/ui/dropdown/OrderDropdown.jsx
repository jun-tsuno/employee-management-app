import Dropdown from './Dropdown';
import { ORDER_OPTIONS } from '@/util/constants';

const OrderDropdown = ({ values, setValue }) => {
	return (
		<>
			<Dropdown
				options={ORDER_OPTIONS}
				values={values}
				handleSetValue={(option) => setValue(option)}
				initialText='Date'
			/>
		</>
	);
};

export default OrderDropdown;
