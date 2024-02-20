'use client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const CustomSkelton = ({ className }) => {
	return (
		<div className={`${className ? className : ''}`}>
			<Skeleton baseColor='#EEEDEB' height='100%' />
		</div>
	);
};
