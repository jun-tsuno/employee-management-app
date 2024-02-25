'use client';
import { useState } from 'react';

const NumberButton = ({ number, active, onClick }) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className={` w-8 h-8 hover:brightness-95 flex items-center justify-center rounded-full border-[1px]
      ${
				active
					? 'bg-primary text-white border-primary'
					: 'bg-text-placeholder border-text-secondary'
			}
    `}
		>
			{number}
		</button>
	);
};

const NumberPicker = ({ label, min = 0, max = 5, handleSelect, initial }) => {
	const [pickedNumber, setPickedNumber] = useState(initial || 0);

	const numberRange = Array.from({ length: max - min + 1 }, (_, i) => i + min);

	const handlePickNumber = (number) => {
		setPickedNumber(number);
		handleSelect(number);
	};

	return (
		<div>
			<div className='font-[500] mb-2 text-text-gray'>{label}</div>
			<div className='flex flex-wrap gap-3'>
				{numberRange?.map((number) => (
					<NumberButton
						key={number}
						number={number}
						active={number === pickedNumber}
						onClick={() => handlePickNumber(number)}
					/>
				))}
			</div>
		</div>
	);
};

export default NumberPicker;
