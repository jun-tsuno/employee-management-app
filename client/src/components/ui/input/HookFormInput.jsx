'use client';
import React from 'react';

export const HookFormInput = React.forwardRef(
	(
		{ id, name, type, label, placeholder, required, className, error, ...rest },
		ref
	) => {
		return (
			<div>
				{label && (
					<label htmlFor={id} className='flex w-fit items-center gap-2 pb-1'>
						<span>{label}</span>
						{required && <span>*</span>}
					</label>
				)}
				<input
					id={id}
					ref={ref}
					type={type || 'text'}
					name={name}
					placeholder={placeholder}
					className={`p-2 w-full border-[1px] disabled:brightness-90 focus:outline-none focus:bg-blue-50 border-gray-300 rounded-sm ${
						className ? className : ''
					}`}
					{...rest}
				/>
				{error && (
					<p className='text-xs text-error pl-1 pt-1'>{error.message}</p>
				)}
			</div>
		);
	}
);
HookFormInput.displayName = 'HookFormInput';

export const HookFormCheckbox = React.forwardRef(
	(
		{
			id,
			name,
			type,
			label,
			value,
			onChange,
			required,
			className,
			error,
			...rest
		},
		ref
	) => {
		return (
			<>
				<div>
					{label && (
						<label htmlFor={id} className='flex w-fit items-center gap-2 pb-1'>
							<span>{label}</span>
							{required && <span>*</span>}
						</label>
					)}
					<input
						id={id}
						ref={ref}
						type='checkbox'
						name={name}
						className={`w-5 h-5 ${className ? className : ''}`}
						{...rest}
					/>
					{error && <p>{error.message}</p>}
				</div>
			</>
		);
	}
);
HookFormCheckbox.displayName = 'HookFormCheckbox';

export const HookFormDropdown = React.forwardRef(
	({ id, name, options, label, required, className, error, ...rest }, ref) => {
		return (
			<>
				<div>
					{label && (
						<label htmlFor={id} className='flex w-fit items-center gap-2 pb-1'>
							<span>{label}</span>
							{required && <span>*</span>}
						</label>
					)}
					<select
						name={name}
						ref={ref}
						{...rest}
						className={`py-1 px-3 rounded-md ${className ? className : ''}`}
					>
						<option value=''>Select...</option>
						{options.map((option, i) => (
							<option key={i} value={option.key}>
								{option.value}
							</option>
						))}
					</select>
					{error && <p>{error.message}</p>}
				</div>
			</>
		);
	}
);
HookFormDropdown.displayName = 'HookFormDropdown';
