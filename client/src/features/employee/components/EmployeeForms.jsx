'use client';
import Button from '@/components/ui/button/Button';
import {
	HookFormCheckbox,
	HookFormDropdown,
	HookFormInput,
} from '@/components/ui/input/HookFormInput';
import { useForm } from 'react-hook-form';
import {
	DATE_REGEX,
	EMPLOYEE_TYPE_OPTIONS,
	POSITION_OPTIONS,
} from '@/util/constants';
import { useDepartmentOptions } from '@/features/department/hooks/use-departments';
import { useCreateEmployee } from '../hooks/use-employees';
import { showErrorToast, showSuccessToast } from '@/components/ui/toast/Toast';

const rules = {
	hired_date: {
		pattern: {
			value: DATE_REGEX,
			message: `Format should be 'yyyy-m-d'`,
		},
		required: 'This field is Required',
	},
	required: {
		required: 'This field is Required',
	},
};

export const EmployeeFormFields = ({ register, errors }) => {
	const { options: departmentOptions } = useDepartmentOptions();

	return (
		<>
			<div className='grid gap-x-3 gap-y-2 sm:grid-cols-2'>
				<HookFormInput
					label='First Name'
					placeholder='John'
					{...register('first_name', rules.required)}
					required
					error={errors.first_name}
				/>
				<HookFormInput
					label='Last Name'
					placeholder='Doe'
					{...register('last_name', rules.required)}
					required
					error={errors.last_name}
				/>
			</div>
			<div className='grid gap-x-3 gap-y-2 sm:grid-cols-2'>
				<HookFormInput
					label='Tel'
					placeholder='012-XXX-XXXX'
					{...register('tel')}
					error={errors.tel}
				/>
				<HookFormInput
					label='Email'
					placeholder='john@example.com'
					{...register('email', rules.required)}
					required
					className=''
					error={errors.email}
				/>
			</div>
			<div className='flex flex-wrap items-center gap-y-4 gap-x-8'>
				<HookFormDropdown
					label='Department'
					options={departmentOptions || []}
					{...register('department')}
					error={errors.department}
				/>
				<HookFormDropdown
					label='Position'
					options={POSITION_OPTIONS}
					{...register('position')}
					error={errors.position}
				/>
				<HookFormDropdown
					label='Employment Type'
					options={EMPLOYEE_TYPE_OPTIONS}
					{...register('employment_type')}
					error={errors.employment_type}
				/>
			</div>
			<div className='grid sm:grid-cols-2 gap-3'>
				<HookFormInput
					label='Salary($)'
					type='number'
					{...register('salary')}
					error={errors.salary}
				/>
				<HookFormInput
					label='Hired Date'
					placeholder='yyyy-m-d'
					{...register('hired_date', rules.hired_date)}
					error={errors.hired_date}
					required
				/>
			</div>
			<HookFormCheckbox
				label='On Leave'
				{...register('is_on_leave')}
				error={errors.is_on_leave}
			/>
		</>
	);
};

export const AddEmployeeForm = () => {
	const { isLoading, createEmployee } = useCreateEmployee();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		let dataToSend = {
			first_name: data.first_name,
			last_name: data.last_name,
			tel: data.tel || null,
			email: data.email,
			hired_date: data.hired_date || null,
			is_on_leave: data.is_on_leave,
			salary: Number(data.salary) || 0,
			employment_type: data.employment_type || null,
			position: data.position || null,
			department: data.department || null,
		};

		const result = await createEmployee(dataToSend);

		if (!result.created) return showErrorToast(result.error);
		reset();
		showSuccessToast('Successfully Added Employee');
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
				<EmployeeFormFields register={register} errors={errors} />
				<Button type='submit' secondary disabled={isLoading}>
					{isLoading ? 'Submitting...' : 'Add Employee'}
				</Button>
			</form>
		</>
	);
};
