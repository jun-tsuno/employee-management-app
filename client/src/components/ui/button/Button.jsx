import classNames from 'classnames';

const Button = ({
	children,
	primary,
	secondary,
	danger,
	outline,
	cancel,
	className,
	type,
	onClick,
	...rest
}) => {
	const classes = classNames(
		`w-fit py-2 px-4 rounded-md hover:brightness-90 disabled:brightness-90 ${
			className ? className : ''
		}`,
		{
			'bg-primary text-white': primary,
		},
		{
			'bg-green text-white': secondary,
		},
		{
			'bg-error text-white': danger,
		},
		{
			'border-[1px]': outline,
		},
		{
			'border-[1px] border-text-secondary hover:bg-text-secondary hover:!brightness-100 hover:text-white':
				cancel,
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
