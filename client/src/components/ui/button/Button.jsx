import classNames from 'classnames';

const Button = ({
	children,
	primary,
	secondary,
	outline,
	className,
	type,
	onClick,
	...rest
}) => {
	const classes = classNames(
		`w-fit py-2 px-4 rounded-md hover:brightness-90 ${
			className ? className : ''
		}`,
		{
			'bg-primary text-white': primary,
		},
		{ 'bg-green text-white': secondary },
		{
			'border-[1px]': outline,
		}
	);

	return (
		<>
			<button
				type={type || 'button'}
				onClick={onClick}
				className={classes}
				{...rest}
			>
				{children}
			</button>
		</>
	);
};

export default Button;
