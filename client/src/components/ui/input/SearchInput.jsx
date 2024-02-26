'use client';
import { useState, useEffect } from 'react';
import { SearchIcon } from '@public/svgs';

const SearchInput = ({ setTerm, placeholder, className, ...rest }) => {
	const [value, setValue] = useState('');

	useEffect(() => {
		const delay = setTimeout(() => {
			setTerm(value);
		}, 800);

		return () => clearTimeout(delay);
	}, [value, setTerm]);

	return (
		<>
			<div className={`flex h-8 items-center gap-2 bg-white px-2 rounded-md`}>
				<SearchIcon className='w-4 h-4' />
				<input
					type='text'
					name='search-word'
					placeholder={placeholder}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					autoComplete='off'
					className={`focus:outline-none focus:bg-white w-full ${
						className ? className : ''
					}`}
					{...rest}
				/>
			</div>
		</>
	);
};

export default SearchInput;
