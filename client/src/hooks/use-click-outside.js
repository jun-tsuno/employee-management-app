import { useEffect, useRef, useState } from 'react';

const useClickOutside = () => {
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef(null);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const handleClickOutside = (event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setOpen(false);
		}
	};

	return { wrapperRef, open, setOpen };
};

export default useClickOutside;
