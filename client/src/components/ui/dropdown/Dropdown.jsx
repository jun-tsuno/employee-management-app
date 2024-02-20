'use client';
import useClickOutside from '@/hooks/use-click-outside';
import { ChevronIcon } from '@public/svgs';

const Dropdown = ({
	options,
	values,
	handleSetValue,
	initialText,
	buttonClass,
	boxClass,
}) => {
	const { wrapperRef, open, setOpen } = useClickOutside();

	const handleOption = (option) => {
		handleSetValue(option);
		setOpen(false);
	};

	return (
		<>
			<div ref={wrapperRef} className='w-fit relative'>
				<button
					onClick={() => setOpen(!open)}
					className={`bg-text-secondary justify-between flex items-center gap-3 text-white py-1 rounded-lg px-3 ${
						buttonClass ? buttonClass : ''
					}`}
				>
					<span>{values?.value || initialText}</span>
					<ChevronIcon
						className={`w-4 h-4 transition-all duration-75 ${
							open ? 'rotate-90' : '-rotate-90'
						}`}
					/>
				</button>

				{open && (
					<div
						className={`absolute bg-white shadow-lg min-w-full ${
							boxClass ? boxClass : ''
						}`}
					>
						{options.map((option, i) => (
							<div
								key={i}
								onClick={() => handleOption(option)}
								className='py-2 hover:cursor-pointer px-4 hover:bg-primary hover:text-white'
							>
								{option?.value}
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default Dropdown;
