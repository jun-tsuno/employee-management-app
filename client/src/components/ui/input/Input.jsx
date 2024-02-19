import React from 'react';

const Input = ({
	id,
	name,
	type,
	label,
	value,
	placeholder,
	onChange,
	required,
	className,
	...rest
}) => {
	return (
		<div>
			{label && (
				<label htmlFor={id} className='flex w-fit items-center gap-2 pb-1'>
					<span>{label}</span>
					{required && <span>* Required</span>}
				</label>
			)}
			<input
				id={id}
				type={type || 'text'}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={`p-2 w-full border-[1px] disabled:brightness-90 focus:outline-none focus:bg-blue-50 border-gray-300 rounded-sm ${
					className ? className : ''
				}`}
				{...rest}
			/>
		</div>
	);
};

export default Input;
