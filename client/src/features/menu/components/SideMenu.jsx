'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
	HamburgerIcon,
	ChevronIcon,
	PersonIcon,
	OfficeIcon,
	EvaluationIcon,
} from '@public/svgs';

const menu = [
	{ href: '/dashboard', title: 'Employees' },
	{ href: '/departments', title: 'Departments' },
	{ href: '/evaluation', title: 'Evaluation' },
];

const CustomLink = ({ href, children, icon, className, ...rest }) => {
	const navIcon = {
		Employees: <PersonIcon className='w-6 h-6 text-text-secondary' />,
		Departments: <OfficeIcon className='w-6 h-6 text-text-secondary' />,
		Evaluation: <EvaluationIcon className='w-6 h-6 text-text-secondary' />,
	};

	return (
		<Link
			href={href}
			className={`flex items-center group gap-3 ${className ? className : ''}`}
			{...rest}
		>
			{icon && navIcon[icon]}
			<span className='group-hover:underline'>{children}</span>
		</Link>
	);
};

const HamburgerMenu = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className='md:hidden'>
			<button
				onClick={() => setOpen(true)}
				className='relative hover:text-error'
			>
				<HamburgerIcon className='w-8 h-8' />
			</button>

			{open && (
				<div
					className={`fixed top-10 md:top-14 z-50 h-[100vh] bg-white w-[80%] bg-primary-red duration-75 transition-all max-w-[300px] ${
						open ? 'left-0' : '-left-full'
					}`}
				>
					<div className='flex flex-col py-4 px-6'>
						<button
							onClick={() => setOpen(false)}
							className='w-fit p-2 hover:text-error ml-auto'
						>
							<ChevronIcon className='w-7 h-7' />
						</button>
						<nav className='space-y-6'>
							{menu.map((menu) => (
								<CustomLink
									key={menu.href}
									href={menu.href}
									icon={menu.title}
									onClick={() => setOpen(false)}
								>
									{menu.title}
								</CustomLink>
							))}
						</nav>
					</div>
				</div>
			)}
		</div>
	);
};

export const SideMenu = ({ className }) => {
	return (
		<div className={`${className ? className : ''}`}>
			<HamburgerMenu />

			<nav className='bg-white space-y-6 rounded-md py-6 px-2 shadow-sm max-md:hidden'>
				{menu.map((menu) => (
					<CustomLink key={menu.href} href={menu.href} icon={menu.title}>
						{menu.title}
					</CustomLink>
				))}
			</nav>
		</div>
	);
};
